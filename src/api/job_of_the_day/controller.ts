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

// Get all job of the day
export const getAllInDB: RequestHandler = async (req, res, next) => {
  try {
    const jobOfTheDays = await JOTD.getAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: jobOfTheDays.length,
      data: { jobOfTheDays },
    });
  } catch (error) {
    next(error);
  }
};

// Get job of the day by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    const jobOfTheDay = await JOTD.getById(req.params.id);
    if (!jobOfTheDay)
      return next(new AppError("Job of the day not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { jobOfTheDay },
    });
  } catch (error) {
    next(error);
  }
};

// Update job of the day
export const updateInfo: RequestHandler = async (req, res, next) => {
  try {
    const data = <JOTDRequests.IUpdateInput>req.value;
    const jobOfTheDay = await JOTD.updateInfo(req.params.id, data);
    if (!jobOfTheDay)
      return next(new AppError("Job of the day not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Job of the day updated successfully",
      data: { jobOfTheDay },
    });
  } catch (error) {
    next(error);
  }
};
