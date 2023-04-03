import { Router } from "express";
import {
  isAuthenticatedUser,
  authorizeRoles,
  isBusinessAuthenticated,
} from "../../middlewares/auth.js";
import {
  createSpecialist,
  deleteSpecialist,
  getAllSpecialist,
  getSingleSpecialist,
  updateSpecialist,
} from "./SpecialistController.js";

const router = Router();

router.route("/add").post(createSpecialist);
router.route("/getall").get(getAllSpecialist);
router.route("/get/:id").get(getSingleSpecialist);
router.route("/delete/:id").delete(deleteSpecialist);
router.route("/update/:id").patch(updateSpecialist);

export default router;
