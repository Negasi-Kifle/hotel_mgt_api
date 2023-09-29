import mongoose, { Schema } from "mongoose";
import UsersDoc from "./dto";
import validator from "validator";
import bcrypt from "bcryptjs";
import IUsersDoc from "./dto";

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
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    is_credential_changed: { type: Boolean, default: false },
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
usersSchema.pre("save", function (this: IUsersDoc, next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

// Update is_credential_changed if either of email, phone, password is changed
usersSchema.pre("save", function (this: IUsersDoc, next) {
  if (
    (!this.isModified("password") &&
      !this.isModified("email") &&
      !this.isModified("phone_number")) ||
    this.isNew
  ) {
    return next();
  }
  this.is_credential_changed = true;
  next();
});

// Check password is correct when user tries to login
usersSchema.methods.checkPassword = function (
  plainPassword: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

// usersSchema.methods.password

// Create users model
const Users = mongoose.model<IUsersDoc>("Users", usersSchema);

// Export model
export default Users;
