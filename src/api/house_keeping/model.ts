import mongoose, { Schema } from "mongoose";
import IHKDoc from "./dto";

// Schema for house keeping model
const hkSchema = new Schema(
  {
    house_keeper: {
      type: Schema.ObjectId,
      ref: "Users",
    },
    supervisor: {
      type: Schema.ObjectId,
      ref: "Users",
    },
    task_date: {
      type: Date,
      required: [true, "Task date is required"],
    },
    rooms_task: [
      {
        room: {
          type: Schema.ObjectId,
          ref: "Rooms",
        },
        task: {
          type: String,
          required: [true, "Task is required"],
          enum: {
            values: ["Clean", "Full"],
            message: "Unknown task selected",
          },
        },
        linens_used: [
          {
            linen_type: {
              type: Schema.ObjectId,
              ref: "LinenTypes",
            },
            amount: Number,
          },
        ],
        is_cleaned: {
          type: Boolean,
          default: false,
        },
        is_approved: {
          type: Boolean,
          default: false,
        },
      },
    ],
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

// House keeping model
const HouseKeeping = mongoose.model<IHKDoc>("HouseKeeping", hkSchema);

export default HouseKeeping; // Export the house keeping model
