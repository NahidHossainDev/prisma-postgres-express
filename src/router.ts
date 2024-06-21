import { Router } from "express";
import { CategoryRoute } from "./module/category/category.router";
import { UserRoute } from "./module/users/user.router";

const appRouter = Router();

const routerModule = [
	{ path: "/user", router: UserRoute },
	{ path: "/category", router: CategoryRoute },
];

routerModule.forEach((el) => appRouter.use(el.path, el.router));

export default appRouter;
