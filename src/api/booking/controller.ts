import AppError from "../../utils/app_error";
import { RequestHandler } from "express";
import Booking from "./dal";
import Rooms from "../rooms/dal";

// Create booking
export const createBooking: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <BookingRequest.ICreateInput>req.value;

    // If "arr_time" and "dep_time" are null, set them to a default value of 10AM and 12PM respectively
    if (!data.arr_time) {
      const arrDate = new Date(data.arr_date);
      data.arr_time = new Date(arrDate.setHours(10));
    }

    if (!data.dep_time) {
      const depTime = new Date(data.dep_date);
      data.dep_time = new Date(depTime.setHours(12));
    }

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

// Get all bookings
export const getAllBookings: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.query.status);
    const bookings = await Booking.getAll(req.query.status as string);

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
    // Incoming data
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
    const { arr_date, dep_date } = req.query;
    if (!arr_date || !dep_date)
      return next(
        new AppError("Arrival and departure dates are required", 400)
      );

    const freeRooms = await Booking.getFreeRooms(
      arr_date as string,
      dep_date as string
    );

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

// Update booking status
export const updateStatus: RequestHandler = async (req, res, next) => {
  try {
    const data = <BookingRequest.IUpdateStatus>req.value;

    const booking = await Booking.updateStatus(req.params.bookingId, data);
    if (!booking) return next(new AppError("Booking does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `Status of booking by ${booking.first_name} updated successfully`,
      data: { booking },
    });
  } catch (error) {
    next(error);
  }
};

// Get bookings by status
export const getByStatus: RequestHandler = async (req, res, next) => {
  try {
    const status = req.query.status as string;
    const bookings = await Booking.getByStatus(status);

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

// Get rooms/bookings reserved in specific date
export const getRoomsResvInDate: RequestHandler = async (req, res, next) => {
  try {
    const { selected_date } = req.query;

    // Check date is selected
    if (!selected_date)
      return next(new AppError("Selected date is required", 400));

    // Fetch reserved rooms
    const rooms = await Booking.reservedRoomsInDate(selected_date as string);

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
