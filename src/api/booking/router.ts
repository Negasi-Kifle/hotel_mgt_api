import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI } from "./validator";
import { createBooking, getAllBookings, getById } from "./controller";

// Mount roles with their  respective controller method
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin", "Receptionist"),
    validator(validateCreateAPI),
    createBooking
  )
  .get(protect, getAllBookings);

router.route("/:bookingId").get(protect, getById);

// Export router
export default router;
