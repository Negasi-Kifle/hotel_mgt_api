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
    data.linen_slug = data.linen_slug.toLowerCase();
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

// Delete by id
export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    const linenType = await Linens.deleteById(req.params.id);
    if (!linenType) return next(new AppError("Linen type does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `${linenType.linen_type} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

// Get linen type by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    const linenType = await Linens.getById(req.params.id);
    if (!linenType) return next(new AppError("Linen type not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { linenType },
    });
  } catch (error) {
    next(error);
  }
};

// Update linen_type
export const updateLinenType: RequestHandler = async (req, res, next) => {
  try {
    const data = <LinenTypeRequests.IUpdateInput>req.value;
    const linenType = await Linens.updateInfo(req.params.id, data);
    if (!linenType) return next(new AppError("Linen type does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `${linenType.linen_type} updated successfully`,
      data: { linenType },
    });
  } catch (error) {
    next(error);
  }
};
