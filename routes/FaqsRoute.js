import express from "express";
import {
    createFaqs,
    getAllFaqs,
    getOneFaqs,
    updateFaqs,
    deleteOneFaqs
} from "../controllers/FaqsController.js"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"
router.route("/faqs/create/").post(isAuthenticatedUser, createFaqs)
router.route("/faqs/getAll/").get(isAuthenticatedUser, getAllFaqs)
router.route("/faqs/getOne/:id").get(isAuthenticatedUser, getOneFaqs)
router.route("/faqs/update/:id").put(isAuthenticatedUser, updateFaqs);
router.route("/faqs/delete/:id").delete(isAuthenticatedUser, deleteOneFaqs);
export default router;