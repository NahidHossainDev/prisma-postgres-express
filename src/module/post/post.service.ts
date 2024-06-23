import { Post, Prisma, PrismaClient } from "@prisma/client";
import { searchableFields } from "./constants";
import { IPostPayload, IPostQuery } from "./post.interface";

const prisma = new PrismaClient();

const getAllPost = async (queries: IPostQuery): Promise<any> => {
	const { sortBy, sortOrder, searchTerm, page = 1, limit = 5, ...rest } = queries || {};
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

	const skip = Number(limit) * (Number(page) - 1);
	const take = Number(limit);

	return await prisma.$transaction(async (tx) => {
		const result = await tx.post.findMany({
			orderBy,
			skip,
			take,
			where: { AND: whereCondition },
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

		const total = await tx.post.count();

		return {
			total,
			page,
			limit,
			data: result,
		};
	});
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
