import rateLimit from "express-rate-limit";

const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"); // 15 minutes
const max = parseInt(process.env.RATE_LIMIT_MAX || "20");

export const authLimiter = rateLimit({
    windowMs,
    max,
    message: {
        success: false,
        message:
            "Too many login attempts. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});