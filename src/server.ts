import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient();

async function main() {
	try {
		await prisma.$connect();
		console.log("Server connected successfully!");
		app.listen(process.env.PORT, () => {
			console.log(`Server listening on port ${process.env.PORT}`);
		});
	} catch (error) {
		console.log(error);
		await prisma.$disconnect();
		process.exit(1);
	}
}

main();
