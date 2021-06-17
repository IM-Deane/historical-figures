import React, { useState } from "react";
import { useHistory } from "react-router";

// Redux
import { useDispatch } from "react-redux";
// Actions
import { signin, signup } from "../../actions/auth";

// Styles
import {
	Avatar,
	Typography,
	Paper,
	Grid,
	Container,
	Button,
} from "@material-ui/core";
// Custom styles
import useStyles from "./styles";
// Password field icon
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// Google Icon
import Icon from "./Icon.js";
import { GoogleLogin } from "react-google-login";

// Custom input field component
import Input from "./Input.js";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

function Auth() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState(initialState);

	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	// Toggle form view
	const [isSignup, setIsSignup] = useState(false);

	// Toggle password state
	const handleShowPassword = () =>
		setShowPassword((prevShowPassword) => !prevShowPassword);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			// Pass history to navigate after submission
			dispatch(signup(formData, history));
		} else {
			dispatch(signin(formData, history));
		}
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const switchMode = () => {
		setIsSignup((previsSignup) => !previsSignup);
		setShowPassword(false);
	};

	// Google functions
	const googleSuccess = async (res) => {
		// Optional chaining error handling: avoid undefined error
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: "AUTH", data: { result, token } });
			// Redirect to home page after sign in
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (error) => {
		console.log("Google Sign In was unsuccessful. Try again Later.");
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Email  Address"
							handleChange={handleChange}
							type="email"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name="confirmPassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>
					{/* Google sigin */}
					<GoogleLogin
						clientId="961955129519-9604h5a60qfereigh0lg7p4v1qf37vam.apps.googleusercontent.com"
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained"
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? "Already have an account? Sign In"
									: "Don't have an account? Sign up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
}

export default Auth;
