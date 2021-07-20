import axios from "axios";

// Create base url that allows the use of other endpoints
// Used in production deployment
const API = axios.create({
	baseURL: "https://historical-figures-mern.herokuapp.com/",
});

// Dev/testing url
// const API = axios.create({
// 	baseURL: "https://localhost:5000",
// });

// On each request, send the users token to verify their access
API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		// Add token
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);

// Get the specified posts
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) =>
	API.get(
		`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
			searchQuery.tags
		}`
	);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) =>
	API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Login
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
