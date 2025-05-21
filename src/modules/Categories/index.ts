import { Router } from "express";
import {
  deleteCategory,
  createCategory,
  getCategoryById,
  List,
  updateCategory,
} from "./controller";
const router = Router();

router.route("/:id").get(getCategoryById);
router.route("/:id").post(createCategory);
router.route("/:id").put(updateCategory);
router.route("/:id").delete(deleteCategory);
router.route("/").get(List);

export default router;
