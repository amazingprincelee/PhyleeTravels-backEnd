import express from "express";
import eventController from "../controllers/eventController.js";
import { authenticateJWT } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/event/create_event",
  authenticateJWT,
  authorizeRoles("superAdmin", "admin"),
  eventController.createEvent
);
router.post(
  "/event/register_for_event",
  authenticateJWT,
  eventController.registerForEvent
);
router.get("/event/all_events", eventController.getAllEvents);
// Add the route in your routes file
router.get('/event/registrations/:eventId', eventController.getAllRegistrationsForEvent);
router.delete("/event/delete_event/:eventId", authorizeRoles("superAdmin", "admin"), eventController.deleteEvent);

export default router;
