import mongoose, { Schema } from "mongoose";
import IBookingDoc from "./dto";

// Booking schema
const bookingSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "Client's full name is required"],
    },
    last_name: {
      type: String,
      required: [true, "Client's last name is required"],
    },
    id_num: {
      type: String,
      required: [true, "Client's Id number is required"],
    },
    phone_num: String,
    room_id: {
      type: Schema.ObjectId,
      required: [true, "Room number is required"],
    },
    arr_date: {
      type: Date,
      required: [true, "Arrival date is required"],
    },
    arr_time: String,
    dep_date: {
      type: Date,
      required: [true, "Departure date is required"],
    },
    dep_time: String,
    status: {
      type: String,
      default: "Pending",
      enum: {
        values: ["Pending", "Cancelled", "Checked-In", "Checked-Out"],
        message: "Invalid status",
      },
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Booking model
const Booking = mongoose.model<IBookingDoc>("Booking", bookingSchema);

// Export booking model
export default Booking;
