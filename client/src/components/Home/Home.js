import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
// Redux
import { useDispatch } from "react-redux";
// Enables chip pill format
import { ChipInput } from "@material-ui/core/Chip/Chip";
// Routes
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { getPosts } from "../../actions/posts";
import Pagination from "../Pagination";

// Styles
import {
	Container,
	Grow,
	Grid,
	Paper,
	AppBar,
	TextField,
	Button,
} from "@material-ui/core";

import useStyles from "./styles";

// Setup URL search params to enable search functions
function useQuery() {
	return new URLSearchParams(useLocation.search);
}

function Home() {
	const [currentId, setCurrentId] = useState(0);
	const classes = useStyles();

	const dispatch = useDispatch();
	const history = useHistory();
	const query = useQuery();
	// Read url to check for page else user must be on first page
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");
	// Search bar state
	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);

	// Handle search bar enter key
	const handleKeyPress = (e) => {
		// Handle enter key
		if (e.key === 13) {
			// search for post
		}
	};

	// Add and delete tags
	const handleAdd = (tag) => setTags([...tags, tag]);

	const handleDelete = (tagToDelete) =>
		setTags(tags.filter((tag) => tag !== tagToDelete));

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);
	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					container
					className={classes.gridContainer}
					justify="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						{/* Search bar */}
						<AppBar
							className={classes.appBarSearch}
							position="static"
							color="inherit"
						>
							<TextField
								name="search"
								variant="outlined"
								label="Search Memories"
								fullWidth
								value={search}
								onKeyPress={handleKeyPress}
								onChange={(e) => {
									setSearch(e.target.value);
								}}
							/>
							<ChipInput
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={handleAdd}
								onDelete={handleDelete}
								label="Search tags"
								variant="outlined"
							/>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper elevation={6}>
							{/* Pagination tabs */}
							<Pagination />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
}

export default Home;
