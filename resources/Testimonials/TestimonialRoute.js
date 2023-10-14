import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js";
import {
  AddNewTestimonial,
  FindAllTestimonial,
  FindOneTestimonial,
} from "./TestimonialController.js";

const router = express.Router();

router.route("/new").post(isAuthenticatedUser, AddNewTestimonial);
router
  .route("/getAll")
  .get(isAuthenticatedUser, authorizeRoles("admin"), FindAllTestimonial);
router.route("/getOne/:id").get(isAuthenticatedUser, FindOneTestimonial);

// router.route("/product/getAll/").get(getAllProduct)

export default router;
