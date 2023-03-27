import { Router } from "express";
import { authorizeRoles, isAuthenticatedUser } from "../../middlewares/auth.js";
import { createBusiness, getAllBusiness, getSingleBusiness, updateBusiness, deleteBusinessById } from "./BusinessController.js";

const router = Router();

router.route("/add").post(isAuthenticatedUser, authorizeRoles("admin"), createBusiness);
router.route("/update/:id").patch(isAuthenticatedUser, authorizeRoles("admin"), updateBusiness);
router.route("/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBusinessById);
router.route("/get/:id").get(isAuthenticatedUser, getSingleBusiness);
router.route("/getall").get(isAuthenticatedUser, getAllBusiness);

export default router;

