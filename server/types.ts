export type User = {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	email?: string;
	password: string;
};

export type Post = {
	id: string;
	title: string;
	url: string;
	userId: string;
	postedAt: number;
};

export type Like = {
	userId: string;
	postId: string;
};

export type Comment = {
	id: string;
	userId: string;
	postId: string;
	comment: string;
	postedAt: number;
};
