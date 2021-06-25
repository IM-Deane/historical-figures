import axios from "axios";

// Create base url that allows the use of other endpoints
// Used in production deployment
// const API = axios.create{("https://memories-project-im-deane.herokuapp.com/"});
// Dev/testing url
const API = axios.create({ baseURL: "http://localhost:5000" });

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

// Posts
export const fetchPosts = () => API.get("/posts");

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
