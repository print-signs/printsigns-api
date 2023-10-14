import express from "express";
import { isAuthenticatedUser } from "../../middlewares/auth.js";
import { addCategory, getCategories } from "./categoryController.js";
const router = express.Router();

router.route("/add").post(isAuthenticatedUser, addCategory);
router.route("/getCategories").get(isAuthenticatedUser, getCategories);

export default router;
