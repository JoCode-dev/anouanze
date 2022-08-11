import express from "express";
import multer from "multer";
const upload = multer();
const router = express.Router();
import {
  createActu,
  updateActu,
  getActusById,
  getAllActus,
  getOneActu,
  deleteActu,
} from "../controllers/actus.js";

//  GET
router.get("/", getAllActus);
router.get("/:id", getOneActu);
router.get("/paroisse/:id", getActusById);

//  PATCH
router.patch("/:id", updateActu);

// DELETE
router.delete("/:id", deleteActu);

//  POST
router.post("/", upload.single("poster"), createActu);

export default router;
