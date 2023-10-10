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
    time_finished: Date,
    rooms_cleaned: {
      type: Number,
      default: 0,
      min: [0, "Rooms cleaned cannot be less than zero"],
    },
    trol_and_chem_basket: {
      type: Boolean,
      default: false,
    },
    corrider_cleaned: {
      type: Boolean,
      default: false,
    },
    is_done: {
      type: Boolean,
      default: false,
    },
    approved_by: {
      type: Schema.ObjectId,
      ref: "Users",
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
