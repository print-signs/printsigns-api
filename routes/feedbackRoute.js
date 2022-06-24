import express from "express";
import {
    createFeedback,
    getAllFeedback,

} from "../controllers/feedbackController.js"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"
router.route("/feedback/create/").post(isAuthenticatedUser, createFeedback)
router.route("/feedback/getAll/").get(isAuthenticatedUser, authorizeRoles('admin'), getAllFeedback)
export default router;  