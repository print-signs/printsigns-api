import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";

import {
  addDesign,
  deleteDesign,
  getDesign,
  updateDesign,
} from "./designController.js";
const router = express.Router();

router
  .route("/add")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addDesign);
router
  .route("/getDesigns")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getDesign);
router
  .route("/update/:_id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateDesign);
router
  .route("/delete/:_id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDesign);

export default router;
