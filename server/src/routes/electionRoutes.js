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
import { validateElection } from "../middleware/validationMiddleware.js";

const router = express.Router();

// Student/Admin authenticated routes
router.use(authenticate);

// Student routes
router.get("/", getAllElections);
router.get("/:id", getElection);
router.post("/:id/vote", castVote);
router.get("/:id/results", getResults);

// Admin routes
router.post("/", requireAdmin, validateElection, createElection);
router.put("/:id", requireAdmin, validateElection, updateElection);
router.delete("/:id", requireAdmin, deleteElection);

export default router;