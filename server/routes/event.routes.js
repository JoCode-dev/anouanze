import express from "express";
// Controllers
import {
  createEvent,
  getAllEvents,
  getEvent,
  getOthersEvents,
  getPremiumEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";

import multer from "multer";
const upload = multer();

// Middleware Authentication
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", requireAuth, upload.single("poster"), createEvent);
router.get("/", getAllEvents);
router.get("/premium-events", getPremiumEvents);
router.get("/others-events", getOthersEvents);
router.get("/:id", getEvent);
router.patch("/:id", requireAuth, upload.single("poster"), updateEvent);
router.delete("/:id", requireAuth, deleteEvent);

export default router;
