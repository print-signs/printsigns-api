import { Router } from "express";
import {
  addAddress,
  // addGST,
  addLogo,
  addSocialMedia,
  deleteConfig,
  getConfig,
  // addScrollText,
  addTermsOfUse,
  addApplicationName,
  getTermsOfUse,
  addCopyRightMessage,
} from "./Config_controller.js";
import { upload } from "../../../Utils/cloudinary.js";

import { authorizeRoles, isAuthenticatedUser } from "../../../middlewares/auth.js";


const router = Router();

// let cpUpload = upload.fields([
//   { name: "Headerlogo", maxCount: 1 },
//   { name: "Footerlogo", maxCount: 1 },
//   { name: "Adminlogo", maxCount: 1 },
// ]);

// router.route("/gst").post(isAuthenticatedUser, authorizeRoles("admin"), addGST);
router.route("/social").post(isAuthenticatedUser, authorizeRoles("admin"), addSocialMedia);
router.route("/application/name").post(isAuthenticatedUser, authorizeRoles("admin"), addApplicationName);
router.route("/copyright/message").post(isAuthenticatedUser, authorizeRoles("admin"), addCopyRightMessage);



router.route("/address").post(isAuthenticatedUser, authorizeRoles("admin"), addAddress);
// router.route("/scrollText").post(isAuthenticatedUser, authorizeRoles("admin"), addScrollText);
router.route("/logo").post(isAuthenticatedUser, authorizeRoles("admin"), addLogo);
router.route("/").get(getConfig).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteConfig)

router
  .route("/termsofuse")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getTermsOfUse)
  .patch(isAuthenticatedUser, authorizeRoles("admin"), addTermsOfUse);

export default router;
