import express from "express";
import {
    createRequirement,
    getAllRequirement,
    getOneRequirement,
    updateRequirement,
    deleteOneRequirement,
    Approved,
    AddComment,
    getAllComment,
    getSingleComment
} from "../controllers/RequirementController.js"
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"
const router = express.Router();

router.route("/requirement/create/").post(isAuthenticatedUser, createRequirement)
router.route("/requirement/getAll/").get(isAuthenticatedUser, getAllRequirement)
router.route("/requirement/getOne/:id").get(isAuthenticatedUser, getOneRequirement)
router.route("/requirement/update/:id").put(isAuthenticatedUser, updateRequirement);
router.route("/requirement/delete/:id").delete(isAuthenticatedUser, deleteOneRequirement);
//user
router.route("/requirement/comment/create/:id").post(isAuthenticatedUser, AddComment);

//admin
router.route("/admin/requirement/approve/:id").get(isAuthenticatedUser, authorizeRoles("admin"), Approved);
router.route("/admin/requirement/comment/getOne/:id").get(isAuthenticatedUser, getSingleComment);
router.route("/admin/requirement/comment/getAll").get(isAuthenticatedUser, getAllComment);
export default router;