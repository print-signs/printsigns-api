import {
  deleteOneOrder,
  getAllOrder,
  getSingleOrder,
  getUserSelf,
  updateOrderStatusById,
} from "./orderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";
import express from "express";
import {
  captureOrderPayment,
  createOrderCheckout,
  getClientId,
} from "./CheckoutController.js";
const router = express.Router();
//checkout Routes-------------------------//
router.route("/checkout/").post(isAuthenticatedUser, createOrderCheckout);
router.route("/clientid/get/").get(isAuthenticatedUser, getClientId);
router.route("/:orderID/capture/payment").post(captureOrderPayment);
// ---------------------------------------------------
//get user self
router.route("/user/self").get(isAuthenticatedUser, getUserSelf);

//admin route
router
  .route("/getAll/:status")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrder);
router.route("/getOne/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/change/status/:id").patch(updateOrderStatusById);

router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOneOrder);

// router.route("/product/getAll/").get(getAllProduct)

export default router;
