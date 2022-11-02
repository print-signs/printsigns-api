import express from "express";
import {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteOneCategory,
    getOneCategory
} from "../controllers/categoryController.js"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"

router.route("/category/create/").post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)
router.route("/category/getAll/").get(getAllCategory)
router.route("/category/getOne/:id").get(getOneCategory)
router.route("/category/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory);
router.route("/category/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOneCategory);
export default router;