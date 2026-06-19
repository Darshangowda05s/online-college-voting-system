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
      message:
        "Welcome Admin",
    });

  }
);

export default router;