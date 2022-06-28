import express from "express";
import {
    createDirectory,
    getAllDirectory,
    updateDirectory,
    deleteOneDirectory,
    getOneDirectory
} from "../controllers/directoryController.js"
const router = express.Router();
import { isAuthenticatedUser } from "../middlewares/auth.js"


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
router.route("/directory/create/").post(createDirectory)
router.route("/directory/getAll/").get(getAllDirectory)
router.route("/directory/getOne/:id").get(getOneDirectory)
router.route("/directory/update/:id").put(updateDirectory);
router.route("/directory/delete/:id").delete(deleteOneDirectory);
export default router;