import { Router } from "express";
import {
  List,
  createUser,
  deleteUser,
  getUserById,
  profile,
  updateUser,
} from "./controller";
const router = Router();

router.route("/profile").get(profile);
router.route("/").get(List);
router.route("/:id").get(getUserById);
router.route("/:id").post(createUser);
router.route("/:id").put(updateUser);
router.route("/").delete(deleteUser);

export default router;
