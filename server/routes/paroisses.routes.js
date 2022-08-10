import express from "express";

const router = express.Router();

import { getNearParoisses } from "../controllers/paroisses.js";

router.get("/:geo", getNearParoisses);

export default router;
