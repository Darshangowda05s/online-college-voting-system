import express from "express";

import {
  getAllElections,
  getElection,
  castVote,
  getResults,
  createElection,
  updateElection,
  deleteElection,
} from "../controllers/electionController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Student/Admin authenticated routes
router.use(authenticate);

// Student routes
router.get("/", getAllElections);
router.get("/:id", getElection);
router.post("/:id/vote", castVote);
router.get("/:id/results", getResults);

// Admin routes
router.post("/", requireAdmin, createElection);
router.put("/:id", requireAdmin, updateElection);
router.delete("/:id", requireAdmin, deleteElection);

export default router;