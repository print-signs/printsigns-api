import { Router } from "express";
import { getAllShortUrls, getSingleShortUrl } from "./ShortUrlController.js";

const router = Router();

router.route("/getall").get(getAllShortUrls);
router.route("/get/:id").get(getSingleShortUrl);

export default router;
