// All handlers for post routes
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

// Fetch a single post by its id
export const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await PostMessage.findById(id);

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPosts = async (req, res) => {
	const { page } = req.query;

	try {
		const LIMIT = 8;
		// Get start index of every page
		const startIndex = (Number(page) - 1) * LIMIT;
		// Get the total number of pages so we know where the last page is
		const total = await PostMessage.countDocuments({});

		// Get the specified # of posts (according to limit),
		// sorted by newest first (ie. last entry = newest).
		// For each set of pages, make sure you skip the previous ones, hence the starting index.
		// You don't want to keep getting the same posts before rendering the new ones
		const posts = await PostMessage.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);

		res.status(200).json({
			data: posts,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Note: url query and url params are different!
// QUERY -> /posts?page=1 -> page = 1
// PARAMS -> /posts/123 -> id = 123
export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;

	try {
		// i = ignore case sensitivity
		const title = new RegExp(searchQuery, "i");

		// Find all posts that match the query string OR a tag within the tags array
		const posts = await PostMessage.find({
			$or: [{ title }, { tags: { $in: tags.split(",") } }],
		});

		res.json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;

	// Add creator to post based off of an ID
	const newPost = new PostMessage({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;

	const post = req.body;
	// Check if the id is a valid mongoose id
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("No post with that id!");

	const updatedPost = await PostMessage.findByIdAndUpdate(
		_id,
		{ ...post, _id },
		{
			new: true,
		}
	);

	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	// Check if the id is a valid mongoose id
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("No post with that id!");

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: "Post deleted successfully!" });
};

// Like btn
export const likePost = async (req, res) => {
	const { id } = req.params;

	// This prop was passed by auth middlware during user access verification
	// Check if user has proper access
	if (!req.userId) return res.json({ message: "Unauthenticated" });

	// Check if the id is a valid mongoose id
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("No post with that id!");

	const post = await PostMessage.findById(id);

	// Check if user has already liked the post
	const index = post.likes.findIndex((id) => id === String(req.userId));

	if (index === -1) {
		// Like the post
		post.likes.push(req.userId);
	} else {
		// Dislike the post by removing their id from like array
		post.likes = post.likes.filter((id) => id !== String(req.userId));
	}

	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
		new: true,
	});

	res.json(updatedPost);
};
