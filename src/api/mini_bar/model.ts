import mongoose, { Schema } from "mongoose";
import IMiniBarDoc from "./dto";

// Schema for minibar model
const minibarSchema = new Schema(
  {
    employee: {
      type: Schema.ObjectId,
      ref: "Users",
      required: [true, "Please assign an employee to do the minibar task"],
    },
    rooms_minibar: [
      {
        room: {
          type: Schema.ObjectId,
          ref: "Rooms",
          required: [true, "Please select room"],
        },
        status: {
          type: String,
          default: "Pending",
          enum: {
            values: ["Done", "Pending"],
            message: "Status must be either Pending or Done",
          },
        },
      },
    ],
  },
  {
    writeConcern: { w: "majority", j: true },
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create the model
const Minibar = mongoose.model<IMiniBarDoc>("Minibar", minibarSchema);

// Export the model
export default Minibar;
