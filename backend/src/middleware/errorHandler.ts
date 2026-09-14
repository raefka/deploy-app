import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  code?: number;
  keyPattern?: Record<string, number>;
  errors?: Record<string, { message: string }>;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", err.message);

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  if (err.code === 11000 && err.keyPattern?.email) {
    return res.status(409).json({ message: "Email already exists" });
  }

  if (err.name === "ValidationError" && err.errors) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  if (err.name === "StrictModeError" && err.message.includes("email")) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: statusCode === 500 ? "Internal server error" : err.message,
  });
};
