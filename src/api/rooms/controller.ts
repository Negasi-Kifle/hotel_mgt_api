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

// Get room by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    const room = await RoomsDAL.getById(req.params.roomId);
    if (!room) return next(new AppError("Room not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};

// Update room info
export const updateRoomInfo: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <RoomRequest.IUpdateInfoInput>req.value;
    const room = await RoomsDAL.updateRoomInfo(req.params.roomId, data);
    if (!room) return next(new AppError("Room does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `${room.room_id} has been updated successfully`,
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};

// Update room status
export const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <RoomRequest.IUpdateStatusInput>req.value;

    // Update room status
    const room = await RoomsDAL.updateRoomStatus(req.params.roomId, data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `Status of ${room?.room_id} is changed to ${data.room_status}`,
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};

// Delete all rooms
export const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    await RoomsDAL.deleteAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All rooms are deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete room by id
export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    const room = await RoomsDAL.deleteById(req.params.roomId);
    if (!room) return next(new AppError("Room does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      meesage: `${room.room_id} is deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
