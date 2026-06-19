import express from "express";

import {
  authenticate
} from "../middleware/authMiddleware.js";

import {
  requireAdmin
} from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  requireAdmin,
  (req, res) => {
    res.json({
      success: true,
      message:
        "Welcome Admin",
    });
  }
);

export default router;