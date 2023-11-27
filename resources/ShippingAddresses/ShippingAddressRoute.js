import express from "express";
import {
  AddshippingAddress,
  getSingleUserSippingAddress,
  deleteSelfShippingAddress,
} from "./ShippingAddressController.js";
import { isAuthenticatedUser } from "../../middlewares/auth.js";
const router = express.Router();

router.route("/new").post(isAuthenticatedUser, AddshippingAddress);
router
  .route("/user/address/")
  .get(isAuthenticatedUser, getSingleUserSippingAddress);

router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, deleteSelfShippingAddress);

export default router;
