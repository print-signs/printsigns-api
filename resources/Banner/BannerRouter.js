import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";

import {
  addBanner,
  deleteBanner,
  getBanner,
  updateBanner,
} from "./BannerController.js";
const router = express.Router();

router
  .route("/add")
  .post(isAuthenticatedUser, authorizeRoles("admin"), addBanner);
router.route("/getBanners").get(getBanner);
router
  .route("/update/:_id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateBanner);
router
  .route("/delete/:_id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBanner);

export default router;
