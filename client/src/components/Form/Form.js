import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
// Actions
import { createPost, updatePost } from "../../actions/posts";

// Styling
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});
	const user = JSON.parse(localStorage.getItem("profile"));

	// Get a specified post's data from the store
	const post = useSelector((state) =>
		currentId ? state.posts.find((message) => message._id === currentId) : null
	);
	const dispatch = useDispatch();
	const classes = useStyles();

	const clear = () => {
		setCurrentId(0);
		setPostData({
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (currentId === 0) {
			// Add the name of a user to the post.
			// Note: their name is retrieved from their profile in localStorage
			dispatch(createPost({ ...postData, name: user?.result?.name }));
			clear();
		} else {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
			clear();
		}
	};

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	// If a user is not logged in, display a card that says they must login to post
	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h6" align="center">
					Please Sign In to create your own memories and like other's memories.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper} elevation={6}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant="h6">
					{currentId ? `Editing "${post.title}"` : "Creating a Memory"}
				</Typography>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					multiline
					rows={4}
					value={postData.message}
					onChange={(e) =>
						setPostData({ ...postData, message: e.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags (coma separated)"
					fullWidth
					value={postData.tags}
					onChange={(e) =>
						setPostData({ ...postData, tags: e.target.value.split(",") })
					}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postData, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
