import express from "express";
import {
    createDirectory,
    getAllDirectory,
    updateDirectory,
    deleteOneDirectory,
    getOneDirectory
} from "../controllers/directoryController.js"
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js"
router.route("/directory/create/").post(createDirectory)
router.route("/directory/getAll/").get(getAllDirectory)
router.route("/directory/getOne/:id").get(getOneDirectory)
router.route("/directory/update/:id").put(updateDirectory);
router.route("/directory/delete/:id").delete(deleteOneDirectory);
export default router;