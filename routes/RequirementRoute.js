import express from "express";
import {
    createRequirement,
    getAllRequirement,
    getOneRequirement,
    updateRequirement,
    deleteOneRequirement,
    Approved
} from "../controllers/RequirementController.js"
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"
const router = express.Router();

router.route("/requirement/create/").post(isAuthenticatedUser, createRequirement)
router.route("/requirement/getAll/").get(isAuthenticatedUser, getAllRequirement)
router.route("/requirement/getOne/:id").get(isAuthenticatedUser, getOneRequirement)
router.route("/requirement/update/:id").put(isAuthenticatedUser, updateRequirement);
router.route("/requirement/delete/:id").delete(isAuthenticatedUser, deleteOneRequirement);

//admin
router.route("/admin/requirement/approve/:id").get(isAuthenticatedUser, authorizeRoles("admin"), Approved);
export default router;