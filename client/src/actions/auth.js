import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin = (formData, history) => async (dispatch) => {
	try {
		// Login the user
		const { data } = await api.signIn(formData);

		dispatch({ type: AUTH, data });
		// Redirect to home page after login
		history.push("/");
	} catch (error) {
		console.log(error);
	}
};

export const signup = (formData, history) => async (dispatch) => {
	try {
		// create the user account
		const { data } = await api.signUp(formData);

		dispatch({ type: AUTH, data });

		// Redirect to home page after signup
		history.push("/");
	} catch (error) {
		console.log(error);
	}
};
