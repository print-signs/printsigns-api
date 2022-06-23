import express from "express";
import {
    createRestriction,
    getAllRestriction,
    updateRestriction,
    getOneRestriction
} from "../controllers/cmp-restriction-Controller.js"
const router = express.Router();

router.route("/restriction/create/").post(createRestriction)
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"

router.route("/restriction/getAll").get(getAllRestriction)
router.route("/restriction/getOne/:id").get(getOneRestriction)
router.route("/restriction/update/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateRestriction);

export default router;
getAllRestriction