import mongoose, { Schema } from "mongoose";
import IBookingDoc from "./dto";
import validator from "validator";

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
    email: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: () => {
          validator.isEmail;
        },
        message: "Invalid email address",
      },
    },
    room_id: {
      type: Schema.ObjectId,
      ref: "Rooms",
      required: [true, "Room number is required"],
    },
    arr_date: {
      type: Date,
      required: [true, "Arrival date is required"],
    },
    arr_time: Date,
    dep_date: {
      type: Date,
      required: [true, "Departure date is required"],
    },
    dep_time: Date,
    status: {
      type: String,
      default: "Pending",
      enum: {
        values: ["Pending", "Cancelled", "Arrived", "Departed"],
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
