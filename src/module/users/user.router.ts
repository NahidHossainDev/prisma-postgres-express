import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getSingleUser);
router.post("/", UserController.createUser);
router.put("/", UserController.updateUser);
router.post("/profile", UserController.insertOrUpdateUserProfile);
router.delete("/:id", UserController.deleteUser);

export { router as UserRoute };
