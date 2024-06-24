import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const getAllCategories = async (req: Request, res: Response) => {
	try {
		const data = await CategoryService.getAllCategory();
		res.send({
			success: true,
			data,
			message: "Categories retrieve successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const getAllCategoriesPosts = async (req: Request, res: Response) => {
	try {
		const data = await CategoryService.getAllCategoriesPosts();
		res.send({
			success: true,
			data,
			message: "Categories retrieve successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const getSingleCategory = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const data = await CategoryService.getSingleCategory(id);
		res.send({
			success: true,
			data,
			message: "Categories retrieve successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const createCategory = async (req: Request, res: Response) => {
	try {
		const data = await CategoryService.createCategory(req.body);
		res.send({
			success: true,
			data,
			message: "Categories created successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const updateCategory = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const payload = req.body;
		const data = await CategoryService.updateCategory(id, payload);
		res.send({
			success: true,
			data,
			message: "Categories updated successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const deleteCategory = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const data = await CategoryService.deleteCategory(id);
		res.send({
			success: true,
			data,
			message: "Categories deleted successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

export const CategoryController = {
	getAllCategories,
	getAllCategoriesPosts,
	getSingleCategory,
	createCategory,
	updateCategory,
	deleteCategory,
};
