import AppError from "../../utils/app_error";
import Users from "./dal";
import { RequestHandler } from "express";
import generatePassword from "../../utils/generate_password";
import generate_jwt from "../../utils/generate_jwt";

// Create user
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <UserRequest.ICreateUserInput>req.value;

    const defaultPassword = generatePassword(); // Randomly generate default password

    data.password = defaultPassword;
    data.default_password = defaultPassword;

    // Create
    const user = await Users.createUser(data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "New user created successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// User login
export const login: RequestHandler = async (req, res, next) => {
  try {
    // Data
    const data = <UserRequest.ILoginInput>req.value;

    // Find user by email or phone number
    const user = await Users.getByEmailOrPhone(data.email_or_phone);

    // Check user exists  and their password is correct
    if (!user || !user.checkPassword(data.password, user.password)) {
      return next(new AppError("Invalid credntials", 400));
    }

    // Generate token
    const token = generate_jwt({ id: user.id, user: "admin" });

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Logged in successfully",
      data: { user },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await Users.getAllUsers();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: users.length,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};
