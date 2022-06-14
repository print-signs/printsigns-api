import express from "express";
import {
    createOffer,
    getAllOffer,
    updateOffer,
    deleteOffer,
    getOneOffer
} from "../controllers/OffersController.js"
const router = express.Router();

router.route("/offer/create/").post(createOffer)
router.route("/offer/getAll/").get(getAllOffer)
router.route("/offer/getOne/:id").get(getOneOffer)
router.route("/offer/update/:id").put(updateOffer);
router.route("/offer/delete/:id").delete(deleteOffer);
export default router;