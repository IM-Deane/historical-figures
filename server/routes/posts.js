// All routes that handle posts
import express from "express";
import {
	getPostsBySearch,
	getPost,
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} from "../controllers/posts.js";

// Verify the user can access the data before allowing them to complete an action
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", auth, createPost);
// patch = update existing documents
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
