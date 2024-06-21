import { Post, PrismaClient } from "@prisma/client";
import { IPostPayload } from "./post.interface";

const prisma = new PrismaClient();

const getAllPost = async (): Promise<Post[]> => {
	const result = await prisma.post.findMany({
		include: {
			author: {
				select: {
					name: true,
					id: true,
				},
			},
			category: true,
		},
	});
	return result;
};

const getSinglePost = async (id: string): Promise<Post | null> => {
	const result = await prisma.post.findUnique({
		where: { id: parseInt(id) },
		include: {
			author: {
				select: {
					name: true,
					id: true,
				},
			},
			category: true,
		},
	});
	return result;
};

const createPost = async (data: IPostPayload): Promise<Post> => {
	const result = await prisma.post.create({ data });
	return result;
};

const updatePost = async (id: string, data: IPostPayload): Promise<Post> => {
	const result = await prisma.post.update({
		data,
		where: { id: parseInt(id) },
	});
	return result;
};

const deletePost = async (id: string): Promise<Post> => {
	const result = await prisma.post.delete({ where: { id: parseInt(id) } });
	return result;
};

export const PostService = {
	getAllPost,
	getSinglePost,
	createPost,
	updatePost,
	deletePost,
};
