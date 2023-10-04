import Booking from "./model";
import IBookingDoc from "./dto";

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
}
