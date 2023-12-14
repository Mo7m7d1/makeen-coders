import express, { RequestHandler } from "express";
import { memoryDb } from "./datastore//index";

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

app.get("/posts", (_, res) => {
	return res.json({ posts: memoryDb.listPosts() });
});

app.get("/posts/:id", (req, res) => {
	const id = req.params?.id;
	const post = memoryDb.getPost(id);
	return res.json({ post });
});

app.post("/posts", (req, res) => {
	const body = req.body;
	memoryDb.createPost(body);
	return res.sendStatus(200);
});

app.delete("/posts/:id", (req, res) => {
	const id = req.params?.id;
	memoryDb.deletePost(id);
	return res.sendStatus(200);
});

app.listen(3001);
