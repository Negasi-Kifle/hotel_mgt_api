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
