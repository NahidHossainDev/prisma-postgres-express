import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();

router.get("/", CategoryController.getAllCategories);
router.get("/posts", CategoryController.getAllCategoriesPosts);
router.get("/:id", CategoryController.getSingleCategory);
router.post("/", CategoryController.createCategory);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export { router as CategoryRoute };
