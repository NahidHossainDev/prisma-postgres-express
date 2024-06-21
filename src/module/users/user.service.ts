import { PrismaClient, Profile, User } from "@prisma/client";
import { IProfilePayload, IUserPayload } from "./user.interface";

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<User[]> => {
	const result = await prisma.user.findMany();
	return result;
};
const getSingleUser = async (id: string): Promise<any> => {
	const result = await prisma.user.findUnique({
		where: { id: parseInt(id) },
		include: {
			profile: true,
		},
	});
	return result;
};

const createUser = async (data: IUserPayload): Promise<User> => {
	const result = await prisma.user.create({ data });
	return result;
};

const updateUser = async (id: string, data: IUserPayload): Promise<User> => {
	const result = await prisma.user.update({
		data,
		where: { id: parseInt(id) },
	});
	return result;
};

const insertOrUpdateUserProfile = async (data: IProfilePayload): Promise<Profile> => {
	const isExist = await prisma.profile.findUnique({ where: { userId: data?.userId } });
	let result;
	if (isExist) {
		result = await prisma.profile.update({
			data,
			where: { userId: data?.userId },
		});
	} else {
		result = await prisma.profile.create({
			data,
		});
	}
	return result;
};

const deleteUser = async (id: string): Promise<User> => {
	const result = await prisma.user.delete({ where: { id: parseInt(id) } });
	return result;
};

export const UserService = {
	getAllUsers,
	getSingleUser,
	createUser,
	updateUser,
	insertOrUpdateUserProfile,
	deleteUser,
};
