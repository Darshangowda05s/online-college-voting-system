import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { load as yamlLoad } from "js-yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

const corsOrigins = (process.env.CORS_ORIGINS || 
  "http://localhost:5173,http://localhost:5174,http://localhost:5175"
).split(",");

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openApiPath = path.resolve(__dirname, "../../docs/openapi.yaml");
const openApiDocument = yamlLoad(
  fs.readFileSync(openApiPath, "utf8")
);

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument)
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/elections", electionRoutes);

app.get("/", (req, res) => {
  res.send("Election API Running");
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;