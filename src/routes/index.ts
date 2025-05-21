import { Router } from "express";
const router = Router();

import Role from "../modules/Roles";
import User from "../modules/Users";
import User_Public_Routes from "../modules/Users/public_routes";
import Restaurants from "../modules/Restaurants";
import RBranch from "../modules/RBranches";
import Category from "../modules/Categories";
import SubCategory from "../modules/Sub-categories";
import Dishes from "../modules/Dishes";
import { Authentication } from "../middlewares";

// Public Routes
router.use("/auth", User_Public_Routes);

router.use(Authentication);
// Protected Routes

router.use("/roles", Role);
router.use("/users", User);
router.use("/restaurants", Restaurants);
router.use("/branches", RBranch);
router.use("/categories", Category);
router.use("/sub-categories", SubCategory);
router.use("/dishes", Dishes);

export default router;
