import { RequestHandler } from "express";
import HK from "./dal";
import Users from "../users/dal";
import AppError from "../../utils/app_error";
import HouseKeeping from "./model";

// Create house keeping task
export const createHK: RequestHandler = async (req, res, next) => {
  try {
    const data = <HKRequests.ICreateInput>req.value;

    // Check house keeper exists
    const houseKeeper = await Users.getById(data.house_keeper);
    if (!houseKeeper)
      return next(new AppError("Housekeeper does not exist", 404));

    // Create house keeping
    const houseKeeping = await HK.createHK(data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `The housekeeping task has been successfully created for ${houseKeeper.first_name}`,
      data: { houseKeeping },
    });
  } catch (error) {
    next(error);
  }
};

// Get all housekeepings in DB
export const getAllHKsInDB: RequestHandler = async (req, res, next) => {
  try {
    const houseKeepings = await HK.getAllHKsInDB();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: houseKeepings.length,
      data: { houseKeepings },
    });
  } catch (error) {
    next(error);
  }
};

// Get by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    const houseKeeping = await HK.getByTaskId(req.params.taskId);
    if (!houseKeeping)
      return next(new AppError("Housekeeping task not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { houseKeeping },
    });
  } catch (error) {
    next(error);
  }
};

// Get all housekeepings in specific date (by task date)
export const getByTaskDate: RequestHandler = async (req, res, next) => {
  try {
    if (!req.query.task_date)
      return next(new AppError("Please select task date", 400));

    const task_date = new Date(req.query.task_date as string);
    const houseKeepings = await HK.getByTaskDate(task_date);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: houseKeepings.length,
      data: { houseKeepings },
    });
  } catch (error) {
    next(error);
  }
};

// Get housekeepings by housekeeper and task_date
export const getByHKAndTaskDate: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const housekeepings = await HK.getByHkAndTaskDate(
      req.params.id,
      data.task_date
    );

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: housekeepings.length,
      data: { housekeepings },
    });
  } catch (error) {
    next(error);
  }
};

// Get all tasks of a housekeeper
export const getByHouseKeeper: RequestHandler = async (req, res, next) => {
  try {
    const houseKeepings = await HK.getByHouseKeeper(req.params.id);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: houseKeepings.length,
      data: { houseKeepings },
    });
  } catch (error) {
    next(error);
  }
};

// Delete all houseking tasks in DB
export const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    await HK.deleteAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All houseking tasks in DB have been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete by housekeeping id
export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    const housekeeping = await HK.deleteById(req.params.taskId);
    if (!housekeeping)
      return next(new AppError("Housekeeping task does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Houskeeping deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
