import AppError from "../../utils/app_error";
import Users from "./dal";
import { RequestHandler } from "express";
import generatePassword from "../../utils/generate_password";
import generate_jwt from "../../utils/generate_jwt";
import IUsersDoc from "./dto";

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

    user.is_credential_changed = false;
    await user.save();

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

// Get user by id
export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const user = await Users.getById(req.params.userId);
    if (!user) return next(new AppError("User not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Change default password
export const changeDefaultPswd: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <UserRequest.IChangeDefaultPswdInput>req.value;
    const loggedInUser = <IUsersDoc>req.user;

    // Check password matches
    if (!loggedInUser.checkPassword(data.default_pswd, loggedInUser.password)) {
      return next(new AppError("Incorrect default password", 400));
    }

    // Update default password
    const user = await Users.changeDefaultPswd(loggedInUser, data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Your default password is changed successfully. Login again",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Delete all users in DB
export const deleteAllUsers: RequestHandler = async (req, res, next) => {
  try {
    await Users.deleteAllusers();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Deleted all users in DB",
    });
  } catch (error) {
    next(error);
  }
};

// Delete user by id
export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    const loggedInUser = <IUsersDoc>req.user;
    if (loggedInUser.id === req.params.userId) {
      return next(new AppError("You cannot delete your self", 400));
    }

    // Delete user
    const user = await Users.deleteById(req.params.userId);
    if (!user) return next(new AppError("User not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `Data of ${user.first_name} ${user.last_name} has been deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// Change user status
export const changeStatus: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <UserRequest.IChangeStatusInput>req.value;

    const loggedInUser = <IUsersDoc>req.user;
    // Logged in admin can not deactivate their own acccount
    if (data.user_id === loggedInUser.id) {
      return next(new AppError("You can not change your own status", 400));
    }

    // Update status
    const user = await Users.changeStatus(data);
    if (!user) return next(new AppError("User does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `Status of ${user.first_name} ${user.last_name} changed successfully`,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Update personal detail
export const updatePersonalInfo: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const incomingData = <UserRequest.IUpdatePersonalInfo>req.value;
    const loggedInUser = <IUsersDoc>req.user;

    // Update personal info
    const user = await Users.updateUserInfo(loggedInUser.id, incomingData);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "You have updated your personal info successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Get personla info
export const showPersonalInfo: RequestHandler = async (req, res, next) => {
  try {
    const loggedInUser = <IUsersDoc>req.user;
    const user = await Users.getById(loggedInUser.id);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Change password
export const changePswd: RequestHandler = async (req, res, next) => {
  try {
    const data = <UserRequest.IChangePswdInput>req.value;
    const loggedInUser = <IUsersDoc>req.user;

    // Check current password is correct
    if (!loggedInUser.checkPassword(data.current_pswd, loggedInUser.password)) {
      return next(new AppError("Incorrect current password", 400));
    }

    const user = await Users.changePswd(loggedInUser, data.new_pswd);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Password changed successfully. Please login again",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Reset password
export const resetPswd: RequestHandler = async (req, res, next) => {
  try {
    const loggedInUser = <IUsersDoc>req.user;
    if (loggedInUser.id === req.params.userId) {
      return next(new AppError("You cannot reset your own password", 400));
    }

    // Find user
    const userData = await Users.getById(req.params.userId);
    if (!userData) return next(new AppError("User not found", 404));

    // Generate random password
    const new_pswd = generatePassword();

    // Reset password
    const user = await Users.resetPswd(userData, new_pswd);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `${user.first_name} ${user.last_name}'s password has been reset successfully`,
      data: { user, new_pswd },
    });
  } catch (error) {
    next(error);
  }
};

// Update role
export const updateRole: RequestHandler = async (req, res, next) => {
  try {
    const data = <UserRequest.IUpdateRole>req.value;
    const user = await Users.updateRole(req.params.id, data);
    if (!user) return next(new AppError("User does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `Role of ${user.first_name} has been updated successfully`,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
