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
}
