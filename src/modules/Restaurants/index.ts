import { Router } from "express";
import {
  deleteRestaurant,
  createRestaurant,
  getRestaurantById,
  List,
  updateRestaurant,
} from "./controller";
const router = Router();

router.route("/").get(List);
router.route("/:id").get(getRestaurantById);
router.route("/:id").post(createRestaurant);
router.route("/:id").put(updateRestaurant);
router.route("/").delete(deleteRestaurant);

export default router;
