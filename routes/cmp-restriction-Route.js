import express from "express";
import {
    createRestriction,
    getAllRestriction,
    updateRestriction,
    getOneRestriction,
    deleteCms
} from "../controllers/cmp-restriction-Controller.js"
const router = express.Router();

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"
router.route("/restriction/cms/create/").post(isAuthenticatedUser, authorizeRoles('admin'), createRestriction)

router.route("/restriction/getAll").get(getAllRestriction)
router.route("/restriction/getOne/:id").get(getOneRestriction)
router.route("/restriction/cms/update/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateRestriction);
router.route("/restriction/cms/delete/:id").delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCms);


export default router;
getAllRestriction