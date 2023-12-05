import express from "express";
import {
  AddPrivacyAndPolicy,
  AddShipping,
  AddTermsAndConditions,
  getPrivacyPolicy,
  getShipping,
  getTermsAndCondition,
  updatePrivacyPolicy,
  updateShipping,
  updateTermsAndConditions,
} from "./ContentController.js";
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";

const router = express.Router();

router
  .route("/terms-and-conditions")
  .post(isAuthenticatedUser, authorizeRoles("admin"), AddTermsAndConditions);
router
  .route("/terms-and-conditions")
  .get(getTermsAndCondition);
router
  .route("/terms-and-condition-update")
  .patch(
    isAuthenticatedUser,
    authorizeRoles("admin"),
    updateTermsAndConditions
  );
router
  .route("/privacy-and-policy")
  .post(isAuthenticatedUser, authorizeRoles("admin"), AddPrivacyAndPolicy);
router
  .route("/privacy-and-policy")
  .get(getPrivacyPolicy);
router
  .route("/privacy-and-policy-update")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updatePrivacyPolicy);

router
  .route("/shipping-and-policy")
  .post(isAuthenticatedUser, authorizeRoles("admin"), AddShipping);
router
  .route("/shipping-and-policy")
  .get(getShipping);
router
  .route("/shipping-and-policy-update")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateShipping);

export default router;
