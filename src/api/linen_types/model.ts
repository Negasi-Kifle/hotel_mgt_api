import mongoose, { Schema } from "mongoose";
import ILinensDoc from "./dto";

// Schema for linens model
const linenSchema = new Schema(
  {
    linen_type: {
      type: String,
      required: [true, "Linen name/type is required"],
    },
    linen_slug: {
      type: String,
      unique: true,
      required: [true, "Linen slug is required"],
    },
    color_code: {
      type: String,
      require: [true, "Color is required"],
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
const LinenTypes = mongoose.model<ILinensDoc>("LinenTypes", linenSchema);

export default LinenTypes; // Export linen model
