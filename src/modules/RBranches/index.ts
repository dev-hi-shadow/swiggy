
import { Router } from "express";
import {
  deleteBranch,
  createBranch,
  getBranchById,
  List,
  updateBranch,
} from "./controller";
const router = Router();

router.route("/").get(List);
router.route("/:id").get(getBranchById);
router.route("/:id").post(createBranch);
router.route("/:id").put(updateBranch);
router.route("/").delete(deleteBranch);

export default router;
