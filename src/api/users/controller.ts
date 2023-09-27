import AppError from "../../utils/app_error";
import Users from "./dal";
import { RequestHandler } from "express";

// Create user
export const createUser: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <UserRequest.ICreateUserInput>req.value;
    data.password = "hotel123";
    data.default_password = "hotel123";

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
