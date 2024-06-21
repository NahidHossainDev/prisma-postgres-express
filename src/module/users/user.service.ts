import { PrismaClient, User } from "@prisma/client";
import { IUserPayload } from "./user.interface";

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
	const result = await prisma.user.findMany();
	return result;
};

const createUser = async (payload: IUserPayload): Promise<User> => {
	const result = await prisma.user.create({ data: payload });
	return result;
};

const updateUser = async (id: string, payload: IUserPayload): Promise<User> => {
	const result = await prisma.user.update({
		data: payload,
		where: { id: parseInt(id) },
	});
	return result;
};

const deleteUser = async (id: string): Promise<User> => {
	const result = await prisma.user.delete({ where: { id: parseInt(id) } });
	return result;
};

export const UserService = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
};
