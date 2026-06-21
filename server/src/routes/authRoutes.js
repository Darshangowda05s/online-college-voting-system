import express from "express";
import {
    googleLogin,
    logout,
} from "../controllers/authController.js";
import { authLimiter }
    from "../middleware/rateLimiter.js";


const router = express.Router();

router.post(
    "/google",
    authLimiter,
    googleLogin
);
router.post("/logout", logout);

export default router;