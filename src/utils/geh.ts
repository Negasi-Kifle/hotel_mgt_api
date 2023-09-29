import AppError from "./app_error";
import configs from "../configs";
import { Request, Response, NextFunction } from "express";

// Custom error for "Development" environment
const devError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Custom error for "Production" environment
const prodError = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "Opps, somthing went wrong. Please try again",
    });
  }
};

// Error handler middleware
export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "ERROR";

  // Handle different error scenarios
  if (err.message.includes("E11000")) {
    if (err.message.includes("phone_number")) {
      err = new AppError("Phone number already used", 400);
    } else if (err.message.includes("email")) {
      err = new AppError("Email already used", 400);
    } else {
      err = new AppError("Duplicate data found", 400);
    }
  }

  // Jwt related error
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Please login", 401);
  }

  if (configs.env === "DEVELOPMENT") {
    // Send error for different environments
    devError(err, res);
  } else if (configs.env === "PRODUCTION" || configs.env === "QA") {
    prodError(err, res);
  }
};
