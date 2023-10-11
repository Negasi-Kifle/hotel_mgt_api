import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI, validateUpdateAPI } from "./validator";
import {
  createBooking,
  deleteAll,
  deleteById,
  getAllBookings,
  getById,
  getFreeRooms,
  updateInfo,
} from "./controller";

// Mount roles with their  respective controller method
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin", "Receptionist"),
    validator(validateCreateAPI),
    createBooking
  )
  .get(protect, getAllBookings)
  .delete(protect, roleAuth("Super-Admin"), deleteAll);

router.get("/freerooms", protect, getFreeRooms);

router
  .route("/:bookingId")
  .get(protect, getById)
  .patch(
    protect,
    roleAuth("Super-Admin", "Receptionist"),
    validator(validateUpdateAPI),
    updateInfo
  )
  .delete(protect, roleAuth("Super-Admin"), deleteById);

// Export router
export default router;
