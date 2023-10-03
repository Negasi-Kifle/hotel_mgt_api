import { RequestHandler } from "express";
import RoomsDAL from "./dal";
import AppError from "../../utils/app_error";

// Create room
export const createRoom: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <RoomRequest.ICreateInput>req.value;

    // Create room
    const room = await RoomsDAL.createRoom(data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "New room created successfully",
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};

// Get all rooms
export const getAllRooms: RequestHandler = async (req, res, next) => {
  try {
    const rooms = await RoomsDAL.getAllRooms();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: rooms.length,
      data: { rooms },
    });
  } catch (error) {
    next(error);
  }
};
