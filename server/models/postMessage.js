import mongoose from "mongoose";

// Schemas are blueprints for mongoDB documents
// Each post must have the properties defined in the schema
const postSchema = mongoose.Schema({
	title: String,
	message: String,
	name: String,
	creator: String,
	tags: [String],
	selectedFile: String,
	likes: {
		type: [String],
		default: [],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
