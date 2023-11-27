import {
  deleteOneOrder,
  getAllOrder,
  getSingleOrder,
  getUserSelf,
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
  .route("/order/getAll")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrder);
router.route("/order/getOne/:id").get(isAuthenticatedUser, getSingleOrder);
// router
//   .route("/order/edit/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), EditOrderBeforePayment);

router
  .route("/order/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOneOrder);

// router.route("/product/getAll/").get(getAllProduct)

export default router;
