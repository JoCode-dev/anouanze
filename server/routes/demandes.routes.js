import express from "express";

import {
  addDemande,
  updateDemande,
  getDemandsByParoisse,
  getDemand,
} from "../controllers/demandes.js";

const router = express.Router();

router.post("/", addDemande);
router.patch("/:id", updateDemande);
router.get("/paroisse/", getDemandsByParoisse);
router.get("/:id", getDemand);

export default router;
