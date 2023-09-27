import AppError from "../../utils/app_error";
import Users from "./dal";
import { RequestHandler } from "express";
import generatePassword from "../../utils/generate_password";

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
