import mongoose, { Schema } from "mongoose";
import UsersDoc from "./dto";
import validator from "validator";
import bcrypt from "bcryptjs";

// Users schema
const usersSchema = new Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
    },
    phone_number: {
      type: String,
      unique: true,
      sparse: true,
      required: [true, "Phone number is required"],
    },
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
    email_or_phone_changed_at: Date,
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    password_changed_at: Date,
    default_password: String,
    is_default_password: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["Supervisor", "House-Keeper", "Receptionist", "Super-Admin"],
        message: "Unknown role selected",
      },
    },
    status: {
      type: String,
      default: "Active",
      enum: {
        values: ["Active", "Inactive"],
        message: "Unknown status selected",
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

// Hash password before saving user document
usersSchema.pre("save", function (this: UsersDoc, next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

usersSchema.methods.checkPassword = function (
  plainPassword: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

// Create users model
const Users = mongoose.model<UsersDoc>("Users", usersSchema);

// Export model
export default Users;
