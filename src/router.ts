import { Router } from "express";
import { CategoryRoute } from "./module/category/category.router";
import { PostRoute } from "./module/post/post.router";
import { UserRoute } from "./module/users/user.router";

const appRouter = Router();

const routerModule = [
	{ path: "/user", router: UserRoute },
	{ path: "/category", router: CategoryRoute },
	{ path: "/post", router: PostRoute },
];

routerModule.forEach((el) => appRouter.use(el.path, el.router));

export default appRouter;
