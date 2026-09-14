import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
