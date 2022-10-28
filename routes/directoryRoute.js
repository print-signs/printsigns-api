import express from "express";
import {
    createDirectory,
    getAllDirectory,
    updateDirectory,
    deleteOneDirectory,
    getOneDirectory,
    getSelfDirectory,
    setStatus

} from "../controllers/directoryController.js"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"


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
router.route("/directory/create/").post(isAuthenticatedUser, createDirectory)
router.route("/directory/getAll/").get(isAuthenticatedUser, getAllDirectory)
router.route("/directory/getOne/:id").get(getOneDirectory)
router.route("/directory/update/:id").put(isAuthenticatedUser, updateDirectory);
router.route("/directory/delete/:id").delete(isAuthenticatedUser, deleteOneDirectory);
//get Directory from user id
router.route("/directory/self/").get(isAuthenticatedUser, getSelfDirectory);
router.route("/directory/admin/setStatus/:id").get(isAuthenticatedUser, authorizeRoles('admin'), setStatus);


export default router;