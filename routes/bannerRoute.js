import express from "express";
import {
    createBanner,
    getAllBanner,
    updateBanner,
    deleteBanner,
    getOneBanner
} from "../controllers/bannerController.js"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"
router.route("/banner/create/").post(isAuthenticatedUser, authorizeRoles("admin"), createBanner)
router.route("/banner/getAll/").get(getAllBanner)
router.route("/banner/getOne/:id").get(getOneBanner)
router.route("/banner/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateBanner);
router.route("/banner/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBanner);
export default router;