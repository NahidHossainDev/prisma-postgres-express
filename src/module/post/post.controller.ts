import { Request, Response } from "express";
import { PostService } from "./post.service";

const getAllPost = async (req: Request, res: Response) => {
	try {
		const query = req.query;
		const data = await PostService.getAllPost(query);
		res.send({
			success: true,
			data,
			message: "Post retrieve successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const getSinglePost = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const data = await PostService.getSinglePost(id);
		res.send({
			success: true,
			data,
			message: "Post retrieve successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const createPost = async (req: Request, res: Response) => {
	try {
		const data = await PostService.createPost(req.body);
		res.send({
			success: true,
			data,
			message: "Post created successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const updatePost = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const payload = req.body;
		const data = await PostService.updatePost(id, payload);
		res.send({
			success: true,
			data,
			message: "Post updated successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const deletePost = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const data = await PostService.deletePost(id);
		res.send({
			success: true,
			data,
			message: "Post deleted successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

export const PostController = {
	getAllPost,
	getSinglePost,
	createPost,
	updatePost,
	deletePost,
};
