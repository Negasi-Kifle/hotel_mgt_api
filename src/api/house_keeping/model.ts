import mongoose, { Schema } from "mongoose";
import IHKDoc from "./dto";

// Schema for house keeping model
const hkSchema = new Schema(
  {
    house_keeper: {
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
        supervisor: {
          type: Schema.ObjectId,
          ref: "Users",
        },
      },
    ],
    hk_or_supervising: {
      type: String,
      enum: {
        values: ["Housekeeping", "Supervising"],
        message: "Please select Housekeeping or Supervising",
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

// Pre find hook
hkSchema.pre(/^find/, function (this: IHKDoc, next) {
  this.populate({
    path: "rooms_task.supervisor",
    select: "first_name last_name phone_number email",
  });
  next();
});

// House keeping model
const HouseKeeping = mongoose.model<IHKDoc>("HouseKeeping", hkSchema);

export default HouseKeeping; // Export the house keeping model
