import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
// Web token
import decode from "jwt-decode";

// Styles
import useStyles from "./styles";

// Company Logo
import memoriesLogo from "../../images/historical-figures-logo.png";
import memoriesText from "../../images/memories-text.png";

function Navbar() {
	// State
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	// Hooks
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	// Styling
	const classes = useStyles();

	// Functions
	const logout = () => {
		dispatch({ type: "LOGOUT" });

		// Redirect to home
		history.push("/");
		setUser(null);
	};

	// Rerender component based on the user's location
	useEffect(() => {
		const token = user?.token;

		// Check if token is present
		if (token) {
			const decodedToken = decode(token);
			// Log the user out after an hour
			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			{/* Company logo */}
			<Link to="/" className={classes.brandContainer}>
				<img
					className={classes.image}
					src={memoriesLogo}
					alt="icon"
					height="95px"
				/>
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user.result.name}
							src={user.result.imgUrl}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						color="primary"
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
