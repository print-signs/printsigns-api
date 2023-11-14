import express from "express";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  deleteImageFromCloudinary,
  getProductsByCategory,
} from "./ProductController.js";
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";
router
  .route("/product/create/")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/product/getAll/").get(getAllProduct);
router.route("/product/getOne/:id").get(getOneProduct);
router
  .route("/product/update/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router
  .route("/product/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router
  .route("/product/deleteImage/jatinMor/product/:public_id")
  .delete(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    deleteImageFromCloudinary
  );
router.route("/products/category/:categoryName").get(getProductsByCategory);
export default router;
