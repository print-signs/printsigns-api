import express from "express";
import {
    createBanner,
    getAllBanner,
    updateBanner,
    deleteBanner,
    getOneBanner
} from "../controllers/bannerController.js"
const router = express.Router();

router.route("/banner/create/").post(createBanner)
router.route("/banner/getAll/").get(getAllBanner)
router.route("/banner/getOne/:id").get(getOneBanner)
router.route("/banner/update/:id").put(updateBanner);
router.route("/banner/delete/:id").delete(deleteBanner);
export default router;