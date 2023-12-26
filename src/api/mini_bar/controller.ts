import { RequestHandler } from "express";
import MinibarDAL from "./dal";
import AppError from "../../utils/app_error";
import RoomsDAL from "../rooms/dal";
import UsersDAL from "../users/dal";

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
