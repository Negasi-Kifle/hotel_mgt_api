import AppError from "../../utils/app_error";
import { RequestHandler } from "express";
import Booking from "./dal";
import Rooms from "../rooms/dal";

// Create booking
export const createBooking: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <BookingRequest.ICreateInput>req.value;

    // create booking
    const booking = await Booking.createBooking(data);

    // Update status of room to "OCC"
    await Rooms.updateRoomStatus(data.room_id, { room_status: "OCC" });

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "New booking made successfully",
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

// Get all bookings
export const getAllBookings: RequestHandler = async (req, res, next) => {
  try {
    const bookings = await Booking.getAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: bookings.length,
      data: { bookings },
    });
  } catch (error) {
    next(error);
  }
};

// Get by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    const booking = await Booking.getById(req.params.bookingId);
    if (!booking) return next(new AppError("Booking not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

// Update booking info
export const updateInfo: RequestHandler = async (req, res, next) => {
  try {
    const data = <BookingRequest.IUpdateInfoInput>req.value;

    // Update booking
    const booking = await Booking.updateInfo(req.params.bookingId, data);
    if (!booking) return next(new AppError("Booking does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Booking info updated successfully",
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

// Delete all bookings
export const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    await Booking.deleteAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All bookings deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete by id
export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    const booking = await Booking.deleteById(req.params.bookingId);
    if (!booking) return next(new AppError("Booking does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Booking deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get free rooms
export const getFreeRooms: RequestHandler = async (req, res, next) => {
  try {
    const data = <BookingRequest.IGetFreeRooms>req.value;

    const freeRooms = await Booking.getFreeRooms(data.arr_date, data.dep_date);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: freeRooms.length,
      data: { freeRooms },
    });
  } catch (error) {
    next(error);
  }
};
