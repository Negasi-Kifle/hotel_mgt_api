import Linens from "./dal";
import { RequestHandler } from "express";
import slugify from "slugify";
import AppError from "../../utils/app_error";

// Create linen
export const createLinenType: RequestHandler = async (req, res, next) => {
  try {
    // Incoming data
    const data = <LinenTypeRequests.ICreateInput>req.value;
    data.linen_slug = slugify(data.linen_type, "_");

    /// Check linen exists
    if (await Linens.getBySlug(data.linen_slug)) {
      return next(new AppError("Duplicate linen name exists", 400));
    }

    // Create linen
    const linen = await Linens.createLinen(data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "New linen type created successfully",
      data: { linen },
    });
  } catch (error) {
    next(error);
  }
};

// Get all linens
export const getAllLinenTypes: RequestHandler = async (req, res, next) => {
  try {
    const linens = await Linens.getAllLinens();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: linens.length,
      data: { linens },
    });
  } catch (error) {
    next(error);
  }
};

// Delete all linens
export const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    await Linens.deleteAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All linens deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
