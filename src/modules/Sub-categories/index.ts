import { Router } from "express";
import {
  deleteSubCategory,
  createSubCategory,
  getSubCategoryById,
  List,
  updateSubCategory,
} from "./controller";
const router = Router();

router.route("/").get(List);
router.route("/list/:category_id").get(List);
router.route("/:id").get(getSubCategoryById);
router.route("/:id").post(createSubCategory);
router.route("/:id").put(updateSubCategory);
router.route("/:id").delete(deleteSubCategory);

export default router;
