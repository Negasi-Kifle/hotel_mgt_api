import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI } from "./validator";
import { createBooking } from "./controller";

// Mount roles with their  respective controller method
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin", "Receptionist"),
    validator(validateCreateAPI),
    createBooking
  );

// Export router
export default router;
