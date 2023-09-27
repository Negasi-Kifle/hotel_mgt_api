import Joi, { Schema } from "joi";
import { RequestHandler } from "express";
import AppError from "./app_error";

/**
 * Validate payload of incoming requests
 */
export default (joiSchema: Schema): RequestHandler => {
  return (req, res, next) => {
    const { value, error } = joiSchema.validate(req.body);
    if (error) return next(new AppError(error.message, 400));
    // Add "value" from the validated schema to the request object for later use
    req.value = value;
    next();
  };
};
