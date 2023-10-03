import AppError from "../../utils/app_error";
import { RequestHandler } from "express";
import Booking from "./dal";

// Create booking
export const createBooking: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <BookingRequest.ICreateInput>req.value;

    // create booking
    const booking = await Booking.createBooking(data);

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
