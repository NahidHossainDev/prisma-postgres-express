import { Category, PrismaClient } from "@prisma/client";
import { ICategoryPayload } from "./category.interface";

const prisma = new PrismaClient();

const getAllCategory = async (): Promise<Category[]> => {
	const result = await prisma.category.findMany();
	return result;
};

const getAllCategoriesPosts = async (): Promise<Category[]> => {
	const result = await prisma.category.findMany({
		include: {
			post: true,
			_count: true,
		},
	});
	return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
	const result = await prisma.category.findUnique({
		where: { id: parseInt(id) },
	});
	return result;
};

const createCategory = async (data: ICategoryPayload): Promise<Category> => {
	const result = await prisma.category.create({ data });
	return result;
};

const updateCategory = async (id: string, data: ICategoryPayload): Promise<Category> => {
	const result = await prisma.category.update({
		data,
		where: { id: parseInt(id) },
	});
	return result;
};

const deleteCategory = async (id: string): Promise<Category> => {
	const result = await prisma.category.delete({ where: { id: parseInt(id) } });
	return result;
};

export const CategoryService = {
	getAllCategory,
	getAllCategoriesPosts,
	getSingleCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
