import express, { Request, Response, NextFunction } from "express";
const app = express();
import geh from "../utils/geh";
import AppError from "../utils/app_error";
import userRouter from "../api/users/router";
import roomsRouter from "../api/rooms/router";
import bookingRouter from "../api/booking/router";
import linenRouter from "../api/linen_types/router";
import hkRouter from "../api/house_keeping/router";
import jobOfTheDayRouter from "../api/job_of_the_day/router";

// Third party and custom middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount endoints with their routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/linentypes", linenRouter);
app.use("/api/v1/hk", hkRouter);
app.use("/api/v1/jotd", jobOfTheDayRouter);

// Unknown URL
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  return next(new AppError("Unknown URL", 404));
});

// Global error handler
app.use(geh);

// Export app
export default app;
