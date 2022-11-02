import express from "express";
import {
    createEvent,
    getAllEvent,
    updateEvent,
    deleteEvent,
    getOneEvent,
    RegisterUserInEvent,
    getAllRegisterUser,
    getSingleRegisterUser,
    shareApp

} from "../controllers/EventsController.js"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js"
router.route("/event/create/").post(isAuthenticatedUser, authorizeRoles("admin"), createEvent)
router.route("/event/getAll/").get(getAllEvent)
router.route("/event/getOne/:id").get(getOneEvent)
router.route("/event/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateEvent);
router.route("/event/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEvent);
//share app
router.route("/app/share/").get(shareApp)
//user 
router.route("/event/user/register/:id").post(isAuthenticatedUser, RegisterUserInEvent)
router.route("/event/admin/registerUser/getAll/:id").get(isAuthenticatedUser, getAllRegisterUser)
router.route("/event/getOne/registerUser/:id").get(isAuthenticatedUser, getSingleRegisterUser)
export default router;