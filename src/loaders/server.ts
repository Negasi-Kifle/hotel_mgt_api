import express, { Request, Response, NextFunction } from "express";
const app = express();
import geh from "../utils/geh";
import AppError from "../utils/app_error";
import userRouter from "../api/users/router";

// Third party and custom middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount endoints with their routes
app.use("/api/v1/users", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Unknown URL
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("Unknown URL", 404));
});

// Global error handler
app.use(geh);

// Export app
export default app;
