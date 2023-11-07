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
  static async getAll(status?: string): Promise<IBookingDoc[]> {
    try {
      let booking;
      if (
        status === "Pending" ||
        status === "Arrived" ||
        status === "Cancelled" ||
        status === "Departed"
      ) {
        booking = await Booking.find({ status }).populate({
          path: "room_id",
        });
      } else {
        booking = await Booking.find().populate({ path: "room_id" });
      }

      return booking;
    } catch (error) {
      throw error;
    }
  }

  // Get booking by id
  static async getById(id: string): Promise<IBookingDoc | null> {
    try {
      const booking = await Booking.findById(id).populate({ path: "room_id" });
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
    arrDate: string,
    depDate: string
  ): Promise<IRoomsDoc[]> {
    try {
      const bookings = await Booking.find({
        $and: [
          {
            status: { $in: ["Pending", "Arrived"] },
          },
          {
            $or: [
              {
                arr_date: { $lt: new Date(arrDate) },
                dep_date: { $gt: new Date(depDate) },
              }, // Reservation overlaps the given date range
              { arr_date: { $gte: new Date(arrDate), $lt: new Date(depDate) } }, // Reservation starts within the given date range
              { dep_date: { $gt: new Date(arrDate), $lte: new Date(depDate) } }, // Reservation ends within the given date range
            ],
          },
        ],
      }).select("room_id");

      const bookedRoomIds = bookings.map((booking) => booking.room_id);

      // Fetch all rooms except the ones that are booked
      const freeRooms = await Rooms.find({
        $and: [{ _id: { $nin: bookedRoomIds } }],
      });
      return freeRooms;
    } catch (error) {
      throw error;
    }
  }

  // Update booking status
  static async updateStatus(
    id: string,
    status: BookingRequest.IUpdateStatus
  ): Promise<IBookingDoc | null> {
    try {
      const booking = await Booking.findByIdAndUpdate(id, status, {
        runValidators: true,
        new: true,
      });
      return booking;
    } catch (error) {
      throw error;
    }
  }

  // Get booking by status
  static async getByStatus(status: string): Promise<IBookingDoc[]> {
    try {
      const bookings = await Booking.find({ status });
      return bookings;
    } catch (error) {
      throw error;
    }
  }

  // Get rooms reserved in specific date
  static async reservedRoomsInDate(
    selectedDate: string
  ): Promise<IBookingDoc[]> {
    try {
      const housekeepingDate = new Date(selectedDate);
      housekeepingDate.setHours(housekeepingDate.getHours() + 3);
      const reservedRoomsInDate = await Booking.find({
        $and: [
          { arr_date: { $lte: new Date(housekeepingDate) } },
          { dep_date: { $gte: new Date(housekeepingDate) } },
        ],
      }).populate({
        path: "room_id",
        select: "room_id room_type room_price room_floor room_status",
      });
      return reservedRoomsInDate;
    } catch (error) {
      throw error;
    }
  }
}
