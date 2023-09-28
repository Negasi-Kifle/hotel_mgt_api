import UsersDAL from "../api/users/dal";
import AppError from "../utils/app_error";
import verifyJWT from "../utils/verify_jwt";
import { Request, Response, NextFunction } from "express";

/**
 * Protect routes from unauthorized access
 */
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new AppError("Please login", 401));

    // Decode/verify the token
    const tokenDecoded = verifyJWT(token);

    // Check many scenarios to handle before letting the user access a resource
    if (tokenDecoded.user === "admin") {
      const user = await UsersDAL.getById(tokenDecoded.id);
      if (!user) return next(new AppError("Please login", 401));
      if (user.status === "Inactive")
        return next(new AppError("Please login", 400));

      // Check if default password is changed
      if (req.url !== "/defaultpswd" && user.is_default_password)
        return next(new AppError("Please change your default password", 400));

      // Check if user credentials are updated after being logged in
      if (user.checkCredentialsChange(tokenDecoded.iat as number)) {
        return next(new AppError("Please login", 401));
      }

      // Add data of the logged in user to the request object
      req.user = user;
    } else if (tokenDecoded.user === "client") {
      // Do something here
    }
    next();
  } catch (error) {
    next(error);
  }
};
