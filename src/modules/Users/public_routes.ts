import { Router } from "express";
import { register, login } from "./controller";
const router = Router();

router.route("/sign-up").post(register);
router.route("/sign-in").post(login);

export default router;
