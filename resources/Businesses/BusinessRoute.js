import { Router } from "express";
import {
  authorizeRoles,
  isAuthenticatedUser,
  isBusinessAuthenticated,
} from "../../middlewares/auth.js";
import {
  createBusiness,
  getAllBusiness,
  getSingleBusiness,
  updateBusiness,
  deleteBusinessById,
  updatePassword,
  getSelfBusiness,
  loginBusiness,
  forgotPassword,
} from "./BusinessController.js";

const router = Router();

router
  .route("/add")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBusiness);
router
  .route("/update/:id")
  .patch(isAuthenticatedUser, authorizeRoles("admin"), updateBusiness);
router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBusinessById);
router.route("/get/:id").get(isAuthenticatedUser, getSingleBusiness);
router.route("/getall").get(isAuthenticatedUser, getAllBusiness);

router.route("/getselfbusiness").get(isBusinessAuthenticated, getSelfBusiness);

//auth routes
router.route("/login").post(loginBusiness);
router.route("/password/update").patch(isBusinessAuthenticated, updatePassword);

router.route("/password/forgot").post(forgotPassword);

//outer.route("/password/reset/:token").put(resetPassword);

export default router;
