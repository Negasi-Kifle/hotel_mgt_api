import { RequestHandler } from "express";
import HK from "./dal";
import Users from "../users/dal";
import AppError from "../../utils/app_error";

// Create house keeping task
export const createHK: RequestHandler = async (req, res, next) => {
  try {
    const data = <HKRequests.ICreateInput>req.value;

    // Check house keeper exists
    const houseKeeper = await Users.getById(data.house_keeper);
    if (!houseKeeper)
      return next(new AppError("Housekeeper does not exist", 404));

    // Create house keeping
    const houseKeeping = await HK.createHK(data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `The housekeeping task has been successfully created for ${houseKeeper.first_name}`,
      data: { houseKeeping },
    });
  } catch (error) {
    next(error);
  }
};
