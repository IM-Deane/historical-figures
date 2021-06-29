import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// Routes
import postsRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

// Initialize app
const app = express();
dotenv.config();

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/posts", postsRoutes);
app.use("/users", userRoutes);

// Greeting route
app.get("/", (req, res) => {
	res.send("Hello to historical figures server");
});

// DB connection
const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false);
