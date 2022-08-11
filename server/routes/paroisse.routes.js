import express from "express";

// Controllers
import {
  createParoisse,
  getAllParoisses,
  getParoisse,
  updateParoisse,
  deleteParoisse,
  chooseParoisse,
  unChooseParoisse,
  addPriest,
  removePriest,
  findParoisse,
  addMesses,
  deleteMesses,
  addConfessions,
  deleteConfessions,
} from "../controllers/paroisses.js";

import multer from "multer";
const upload = multer();

// Middleware Authentication
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", requireAuth, upload.any("pictures"), createParoisse);
router.get("/", getAllParoisses);
router.get("/:id", getParoisse);
router.patch("/:id", requireAuth, upload.any("pictures"), updateParoisse);
router.delete("/:id", requireAuth, deleteParoisse);
router.patch("/choose-paroisse/:id", requireAuth, chooseParoisse);
router.patch("/unchoose-paroisse/:id", requireAuth, unChooseParoisse);

// Others actions
router.patch(
  "/add-clergy/:id",
  requireAuth,
  upload.single("priestPicture"),
  addPriest
);
router.patch("/remove-clergy/:id", requireAuth, removePriest);

// Recherche de paroisse
router.get("/search?paroisse", requireAuth, findParoisse);

// Messes
router.patch("/add-messe/:id", addMesses);
router.patch("/remove-messe/:id", deleteMesses);

// Confessions
router.patch("/add-confession/:id", addConfessions);
router.patch("/remove-confession/:id", deleteConfessions);

export default router;
