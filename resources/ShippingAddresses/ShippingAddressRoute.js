import express from "express";
import { AddshippingAddress } from "./ShippingAddressController.js";
import { isAuthenticatedUser } from "../../middlewares/auth.js";
const router = express.Router();

router.route("/new").post(isAuthenticatedUser, AddshippingAddress);
// router
//   .route("/getAll")
//   .get(isAuthenticatedUser, getAllmachine);
// router
//   .route("/getOne/:id")
//   .get(isAuthenticatedUser, getSinglemachine);
// router
//   .route("/edit/:id")
//   .put(isAuthenticatedUser, EditMachine);

// router
//   .route("/delete/:id")
//   .delete(isAuthenticatedUser, deleteOneMachine);
// router
//   .route("/admin/verify/:id")
//   .get(
//     isAuthenticatedUser,
//     authorizeRoles("admin"),
//     machineVarificationFromAdmin
//   );

//

export default router;
