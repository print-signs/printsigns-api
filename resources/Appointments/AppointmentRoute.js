import { Router } from "express";
import {
  isAuthenticatedUser,
  authorizeRoles,
  isBusinessAuthenticated,
} from "../../middlewares/auth.js";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
} from "./AppointmentController.js";

const router = Router();

router.route("/new").post(isBusinessAuthenticated, createAppointment);
router.route("/getall").get(getAllAppointments);
router.route("/get/:id").get(getSingleAppointment);
router.route("/update/:id").patch(isBusinessAuthenticated, updateAppointment);
router.route("/delete/:id").delete(isBusinessAuthenticated, deleteAppointment);

export default router;
