import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import app from "./src/app.js";

connectDB();

if (!process.env.COLLEGE_DOMAIN) {
  console.error("COLLEGE_DOMAIN is not configured");
  process.exit(1);
}

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});