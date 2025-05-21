import { Router } from "express";
import { deleteRole, getRoleById, List, updateRole } from "./controller";
const router = Router();

router.route("/").get(List);
router.route("/:id").get(getRoleById);
router.route("/:id").put(updateRole);
router.route("/").post(deleteRole);

export default router;
