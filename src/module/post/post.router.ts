import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();

router.get("/", PostController.getAllPost);
router.get("/group-by-category", PostController.getPostGroupByCat);
router.get("/:id", PostController.getSinglePost);
router.post("/", PostController.createPost);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

export { router as PostRoute };
