import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import electionRoutes from "./routes/electionRoutes.js";


const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true,
  })
);


app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/elections", electionRoutes);


app.get("/", (req, res) => {
  res.send("Election API Running");
});

export default app;