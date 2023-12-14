import express, { RequestHandler } from "express";
import {
	createPost,
	deletePost,
	getPost,
	listPosts,
} from "./controllers/PostController";

const app = express();
app.use(express.json());

const requestMiddlewareLogger: RequestHandler = (req, _, next) => {
	console.log(
		`New request ${req.method} - path:  ${req.path} - body: ${JSON.stringify(
			req.body
		)}`
	);
	next();
};

app.use(requestMiddlewareLogger);

app.get("/posts", listPosts);

app.get("/posts/:id", getPost);

app.post("/posts", createPost);

app.delete("/posts/:id", deletePost);

app.listen(3001);
