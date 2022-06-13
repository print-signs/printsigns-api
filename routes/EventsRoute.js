import express from "express";
import {
    createEvent,
    getAllEvent,
    updateEvent,
    deleteEvent,
    getOneEvent
} from "../controllers/EventsController.js"
const router = express.Router();

router.route("/event/create/").post(createEvent)
router.route("/event/getAll/").get(getAllEvent)
router.route("/event/getOne/:id").get(getOneEvent)
router.route("/event/update/:id").put(updateEvent);
router.route("/event/delete/:id").delete(deleteEvent);
export default router;