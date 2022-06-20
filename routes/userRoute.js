import express from "express"
import {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
} from "../controllers/userController.js"
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"

const router = express.Router();

router.route("/user/register").post(registerUser);

router.route("/user/login").post(loginUser);

router.route("/user/password/forgot").post(forgotPassword);

router.route("/user/password/reset/:token").put(resetPassword);

router.route("/user/logout").get(logout);

router.route("/user/details").get(isAuthenticatedUser, getUserDetails);

router.route("/user/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/user/update/profile").put(isAuthenticatedUser, updateProfile);


export default router;