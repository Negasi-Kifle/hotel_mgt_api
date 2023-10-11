import Booking from "./model";
import IBookingDoc from "./dto";
import Rooms from "../rooms/model";
import IRoomsDoc from "../rooms/dto";

// Data access layer for booking data
export default class BookingDAL {
  // Create booking
  static async createBooking(
    data: BookingRequest.ICreateInput
  ): Promise<IBookingDoc> {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      throw error;
    }
  }

  // Get all bookings
  static async getAll(): Promise<IBookingDoc[]> {
    try {
      const booking = await Booking.find();
      return booking;
    } catch (error) {
      throw error;
    }
  }

  // Get booking by id
  static async getById(id: string): Promise<IBookingDoc | null> {
    try {
      const booking = await Booking.findById(id);
      return booking;
    } catch (error) {
      throw error;
    }
  }

  // Update booking info
  static async updateInfo(
    id: string,
    data: BookingRequest.IUpdateInfoInput
  ): Promise<IBookingDoc | null> {
    try {
      const booking = await Booking.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });
      return booking;
    } catch (error) {
      throw error;
    }
  }

  // Delete all bookings
  static async deleteAll() {
    try {
      await Booking.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  // Delete by id
  static async deleteById(id: string): Promise<IBookingDoc | null> {
    try {
      const booking = await Booking.findByIdAndDelete(id);
      return booking;
    } catch (error) {
      throw error;
    }
  }

  // Get free rooms
  static async getFreeRooms(
    arrDate: Date,
    depDate: Date
  ): Promise<IRoomsDoc[]> {
    try {
      const bookings = await Booking.find({
        $or: [
          { arr_date: { $lt: arrDate }, dep_date: { $gt: depDate } }, // Reservation overlaps the given date range
          { arr_date: { $gte: arrDate, $lt: depDate } }, // Reservation starts within the given date range
          { dep_date: { $gt: arrDate, $lte: depDate } }, // Reservation ends within the given date range
        ],
      }).select("room_id");

      const bookedRoomIds = bookings.map((booking) => booking.room_id);

      // Fetch all rooms except the ones that are booked
      const freeRooms = await Rooms.find({ _id: { $nin: bookedRoomIds } });
      return freeRooms;
    } catch (error) {
      throw error;
    }
  }
}
