import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "./categoryController.js";
const router = express.Router();

router
  .route("/add")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addCategory);
router
  .route("/getCategories")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCategories);
router
  .route("/update/:_id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateCategory);
router
  .route("/delete/:_id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

export default router;
