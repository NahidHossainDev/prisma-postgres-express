import { Post, Prisma, PrismaClient } from "@prisma/client";
import { IPostPayload, IPostQuery } from "./post.interface";

const prisma = new PrismaClient();

const getAllPost = async (queries: IPostQuery): Promise<Post[]> => {
	const { sortBy, sortOrder, searchTerm, ...rest } = queries;
	let whereCondition: any = {};
	if (Object.entries(rest).length) {
		Object.entries(rest).forEach(([key, value]) => {
			if (key !== "published" && typeof value === "string") whereCondition[key] = Number(value as string);
		});
	}
	console.log(whereCondition);

	const orderBy: Prisma.PostOrderByWithRelationInput = sortBy
		? { [sortBy]: sortOrder ? sortOrder : "asc" }
		: { createdAt: "asc" };

	const result = await prisma.post.findMany({
		where: whereCondition,
		orderBy,
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
