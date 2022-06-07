import express from "express";
import {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteOneCategory,
    getOneCategory
} from "../controllers/categoryController.js"
const router = express.Router();

router.route("/category/create/").post(createCategory)
router.route("/category/getAll/").get(getAllCategory)
router.route("/category/getOne/:id").get(getOneCategory)
router.route("/category/update/:id").put(updateCategory);
router.route("/category/delete/:id").delete(deleteOneCategory);
export default router;