import express from "express";
import { isAuthenticatedUser } from "../../middlewares/auth.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./categoryController.js";
const router = express.Router();

router.route("/add").post(isAuthenticatedUser, addCategory);
router.route("/getCategories").get(isAuthenticatedUser, getCategories);
router.route("/update/:_id").patch(isAuthenticatedUser, updateCategory);
router.route("/delete/:_id").delete(isAuthenticatedUser, deleteCategory);

export default router;
