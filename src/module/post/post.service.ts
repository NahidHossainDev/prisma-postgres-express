import { Post, Prisma, PrismaClient } from "@prisma/client";
import { searchableFields } from "./constants";
import { IPostPayload, IPostQuery } from "./post.interface";

const prisma = new PrismaClient();

const getAllPost = async (queries: IPostQuery): Promise<Post[]> => {
	const { sortBy, sortOrder, searchTerm, ...rest } = queries;
	let whereCondition: any = [];
	if (Object.entries(rest).length) {
		whereCondition.push({
			AND: Object.entries(rest).map(([key, value]) => ({
				[key]: key !== "published" ? Number(value) : value, // converting the string to number for filter by ids
			})),
		});
	}

	console.log({ searchTerm });

	if (searchTerm) {
		whereCondition.push({
			OR: searchableFields.map((field) => ({
				[field]: { contains: searchTerm, mode: "insensitive" },
			})),
		});
	}

	console.log(JSON.stringify(whereCondition));

	const orderBy: Prisma.PostOrderByWithRelationInput = sortBy
		? { [sortBy]: sortOrder ? sortOrder : "asc" }
		: { createdAt: "asc" };

	const result = await prisma.post.findMany({
		where: { AND: whereCondition },
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
