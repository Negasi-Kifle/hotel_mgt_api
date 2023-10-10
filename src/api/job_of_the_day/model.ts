import mongoose, { Schema } from "mongoose";
import IJOTDDoc from "./dto";
import { ref } from "joi";

// Schema for Jobe_Of_The_Day model
const jotdSchema = new Schema(
  {
    house_keeper: {
      type: Schema.ObjectId,
      ref: "Users",
      required: [true, "House keeper is required"],
    },
    job: {
      type: String,
      required: [true, "Job description is required"],
    },
    date: {
      type: Date,
      required: [true, "Date of the job is required"],
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

// Model
const JobOfTheDay = mongoose.model<IJOTDDoc>("JobOfTheDay", jotdSchema);

export default JobOfTheDay; // Export the model
