import express from "express";

import { protect } from "../../middleware/authMiddleware.js";
import {
  register,
  login,
  logout,
  getMe,
  getMyPortfolio,
  getPortfolioByUsername,
} from "./auth.Controller.js"
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// 🔥 protected route
router.get("/me", protect, getMe);




router.get("/portfolio/me", protect, getMyPortfolio);
router.get("/portfolio/:username",protect, getPortfolioByUsername);
export default router;
