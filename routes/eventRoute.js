import express from "express";
import eventController from "../controllers/eventController.js";

const router = express.Router();

router.post('/create_event', eventController.createEvent);
router.post('/register_for_event', eventController.registerForEvent);
router.get('/all_events', eventController.getAllEvents);
router.delete('/delete_event/:eventId', eventController.deleteEvent);

export default router;
