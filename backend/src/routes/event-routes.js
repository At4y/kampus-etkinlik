import { Router } from "express";
import {
  getEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event-controller.js";

const router = Router();

router.get("/", getEvents);
// Sabit adres, /:id'den önce olmak zorunda
router.get("/upcoming", getUpcomingEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;