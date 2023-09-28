import IUsersDoc from "../api/users/dto";
import AppError from "../utils/app_error";
import { RequestHandler } from "express";

/**
 * Checks if role of the logged in user is allowed to access a resource/route
 */
export default (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const user = <IUsersDoc>req.user;
    if (!roles.includes(user.role)) {
      return next(new AppError("Access denied", 403));
    }
    next();
  };
};
