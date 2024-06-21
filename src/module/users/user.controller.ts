import { Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const data = await UserService.getAllUsers();
		res.send({
			success: true,
			data,
			message: "Users retrieve successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const getSingleUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const data = await UserService.getSingleUser(id);
		res.send({
			success: true,
			data,
			message: "Users retrieve successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		const data = await UserService.createUser(req.body);
		res.send({
			success: true,
			data,
			message: "Users created successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const payload = req.body;
		const data = await UserService.updateUser(id, payload);
		res.send({
			success: true,
			data,
			message: "Users updated successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const insertOrUpdateUserProfile = async (req: Request, res: Response) => {
	try {
		const payload = req.body;
		const data = await UserService.insertOrUpdateUserProfile(payload);
		res.send({
			success: true,
			data,
			message: "Profile updated successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const data = await UserService.deleteUser(id);
		res.send({
			success: true,
			data,
			message: "Users deleted successfully",
		});
	} catch (error) {
		res.send({
			success: false,
			data: error,
		});
	}
};

export const UserController = {
	getAllUsers,
	getSingleUser,
	createUser,
	updateUser,
	insertOrUpdateUserProfile,
	deleteUser,
};
