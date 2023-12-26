import { RequestHandler } from "express";
import MinibarDAL from "./dal";
import AppError from "../../utils/app_error";
import RoomsDAL from "../rooms/dal";
import UsersDAL from "../users/dal";
import moment from "moment";

// Create minibar
export const createMinibar: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <MiniBarRequests.ICreateInput>req.value;

    // Check user exists
    const user = await UsersDAL.getById(data.employee);
    if (!user) return next(new AppError("User does not exist", 404));

    // Check each room exists
    for (let roomMinibar of data.rooms_minibar) {
      const room = await RoomsDAL.getById(roomMinibar.room);
      if (!room)
        return next(new AppError("You have selected an unknown room", 404));
    }

    // Format the task date
    const taskDate = new Date(data.task_date);
    const formattedTaskDate = moment(taskDate).format("YYYY-MM-DD");
    data.task_date = new Date(formattedTaskDate);

    // Create the mini bar task
    const minibar = await MinibarDAL.create(data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Minibar task created successfully",
      data: { minibar },
    });
  } catch (error) {
    next(error);
  }
};

// Get all minibar tasks
export const getAllMinibars: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all minibars in DB
    const minibars = await MinibarDAL.getAllMinibars();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: minibars.length,
      data: { minibars },
    });
  } catch (error) {
    next(error);
  }
};

// Get minibar by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    // Fetch minibar by id
    const minibar = await MinibarDAL.getBYId(req.params.id);
    if (!minibar) return next(new AppError("Minibar not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { minibar },
    });
  } catch (error) {
    next(error);
  }
};

// Get minibars by employee
export const getByEmp: RequestHandler = async (req, res, next) => {
  try {
    // Fetch minibars assigned to an employee
    const minibars = await MinibarDAL.getByEmp(req.params.empId);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: minibars.length,
      data: { minibars },
    });
  } catch (error) {
    next(error);
  }
};

// Get minibars by task date
export const getByTaskDate: RequestHandler = async (req, res, next) => {
  try {
    // Check task date is provided
    if (!req.query.task_date)
      return next(new AppError("Please provide task date", 400));

    // Format the task date
    const taskDate = new Date(req.query.task_date as string);
    const formattedTaskDate = moment(taskDate).format("YYYY-MM-DD");

    // Find minibars by task date
    const minibars = await MinibarDAL.getByTaskDate(formattedTaskDate);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: minibars.length,
      data: { minibars },
    });
  } catch (error) {
    next(error);
  }
};

// Update minibar
export const updateMinibar: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <MiniBarRequests.IUpdateInput>req.value;

    // Format the task date
    if (data.task_date) {
      const taskDate = new Date(data.task_date);
      const formattedTaskDate = moment(taskDate).format("YYYY-MM-DD");
      data.task_date = new Date(formattedTaskDate);
    }

    // Update minibar
    const minibar = await MinibarDAL.updateMinibar(req.params.id, data);
    if (!minibar) return next(new AppError("Minibar does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Minibar updated successfully",
      data: { minibar },
    });
  } catch (error) {
    next(error);
  }
};
