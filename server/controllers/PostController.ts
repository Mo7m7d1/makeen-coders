import { RequestHandler } from "express";
import { memoryDb } from "../datastore";
import { Post } from "../types";
import { randomUUID } from "crypto";

export type ExpressHandler<req, res> = RequestHandler<
	string,
	Partial<res>,
	Partial<req>,
	any
>;

export const listPosts: ExpressHandler<{}, {}> = (_, res) => {
	return res.json({ posts: memoryDb.listPosts() });
};

export const getPost: RequestHandler = (req, res) => {
	const id = req.params?.id;
	const post = memoryDb.getPost(id);
	return res.json({ post });
};

type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
type CreatePostResponse = {};

export const createPost: ExpressHandler<
	{ post: CreatePostRequest },
	CreatePostResponse
> = (req, res) => {
	const post = req.body.post;
	console.log(req.body.post);

	if (!post || !post.title || !post.url || !post.userId) {
		return res.sendStatus(400);
	}

	memoryDb.createPost({
		...post,
		id: randomUUID(),
		postedAt: Date.now(),
	});
	return res.sendStatus(200);
};

export const deletePost: RequestHandler = (req, res) => {
	const id = req.params?.id;
	memoryDb.deletePost(id);
	return res.sendStatus(200);
};
