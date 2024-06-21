import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.put("/update", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export { router as UserRoute };
