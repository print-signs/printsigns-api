import express from "express";
import {
    createOffer,
    getAllOffer,
    updateOffer,
    deleteOffer,
    getOneOffer
} from "../controllers/OffersController.js"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"

router.route("/offer/create/").post(isAuthenticatedUser, authorizeRoles("admin"), createOffer)//isAuthenticatedUser, authorizeRoles("admin"),
router.route("/offer/getAll/").get(getAllOffer)
router.route("/offer/getOne/:id").get(getOneOffer)
router.route("/offer/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOffer);//isAuthenticatedUser, authorizeRoles("admin"),
router.route("/offer/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOffer);//isAuthenticatedUser, authorizeRoles("admin"),
export default router;