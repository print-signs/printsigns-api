import express from "express";
// import isAuthenticated from "../Utils/aurhe";
import {
    registerUser,
    loginUser,
    logout,
    updatePassword
} from "../controllers/userController.js"
// import {isAuthenticatedUser} from "../Middleware/Auth.js";
import { isAuthenticated } from "../middlewares/auth.js"
import multer from 'multer'

const uploaderImage = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type not supported!"), false)
            return
        }
        cb(null, true);
    }
});
const router = express.Router();

router.route("/user/register/").post(uploaderImage.single("image"), registerUser)
router.route("/user/login/").post(loginUser)
router.route("/user/logout").get(logout);
router.route("/user/update/password").put(isAuthenticated, updatePassword);

export default router;