import { Router } from "express";
import { UserRoute } from "./module/users/user.router";

const appRouter = Router();

const routerModule = [{ path: "/user", router: UserRoute }];

routerModule.forEach((el) => appRouter.use(el.path, el.router));

export default appRouter;
