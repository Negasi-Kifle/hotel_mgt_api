import IRoomsDoc from "./dto";
import mongoose, { Schema } from "mongoose";

// Rooms schema
const roomsSchema = new Schema(
  {
    room_id: {
      type: String,
      required: [true, "Room id is required"],
    },
    room_id_slug: {
      type: String,
      unique: true,
      required: [true, "Room number slug is required"],
    },
    room_type: String,
    room_price: {
      type: Number,
      required: [true, "Room price is required"],
      min: [1, "Price must be at least 1 Euro"],
    },
    room_floor: String,
    room_status: {
      type: String,
      default: "VC",
      enum: {
        values: ["OCC", "VD", "VR", "OOO", "VC"],
        message: "Unknown room status selected",
      },
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Rooms model
const Rooms = mongoose.model<IRoomsDoc>("Rooms", roomsSchema);

export default Rooms;
