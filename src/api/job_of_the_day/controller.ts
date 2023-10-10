import { RequestHandler } from "express";
import JOTD from "./dal";
import Users from "../users/dal";
import AppError from "../../utils/app_error";

// Create job of the day
export const createJobOfTheDay: RequestHandler = async (req, res, next) => {
  try {
    const data = <JOTDRequests.ICreateInput>req.value;

    // Check house keeper exists
    const housekeeper = await Users.getById(data.house_keeper);
    if (!housekeeper)
      return next(new AppError("Housekeeper does not exist", 404));

    // Create job of the day
    const jobOfTheDay = await JOTD.createJobOfTheDay(data);

    // Resposne
    res.status(200).json({
      status: "SUCCESS",
      message: "New job of the day created successfully",
      data: { jobOfTheDay },
    });
  } catch (error) {
    next(error);
  }
};
