import express from "express";

// Controllers
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

import { signup, login, logout } from "../controllers/auth.js";

const router = express.Router();

// Authentication routes
router.post("/login", login);
router.post("/register", signup);
router.get("/logout", logout);

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
