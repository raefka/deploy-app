import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDatabase } from "./config/database";

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
