import express from "express";
import {
    createNews,
    getAllNews,
    getOneNews,
    updateNews,
    deleteOneNews
} from "../controllers/NewsController.js"
const router = express.Router();

router.route("/news/create/").post(createNews)
router.route("/news/getAll/").get(getAllNews)
router.route("/news/getOne/:id").get(getOneNews)
router.route("/news/update/:id").put(updateNews);
router.route("/news/delete/:id").delete(deleteOneNews);
export default router;