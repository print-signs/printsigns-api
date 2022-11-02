import express from "express";
import {
    createNews,
    getAllNews,
    getOneNews,
    updateNews,
    deleteOneNews
} from "../controllers/NewsController.js"
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/news/create/").post(isAuthenticatedUser, authorizeRoles("admin"), createNews)
router.route("/news/getAll/").get(getAllNews)
router.route("/news/getOne/:id").get(getOneNews)
router.route("/news/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateNews);
router.route("/news/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOneNews);
export default router;