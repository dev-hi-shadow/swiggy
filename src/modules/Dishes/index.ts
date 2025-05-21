import { Router } from "express";
import {
  deleteDish,
  createDish,
  getDishById,
  List,
  updateDish,
} from "./controller";
const router = Router();

router.route("/").get(List);
router.route("/:id").get(getDishById);
router.route("/:id").post(createDish);
router.route("/:id").put(updateDish);
router.route("/").delete(deleteDish);

export default router;
