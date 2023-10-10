import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI } from "./validator";
import { createJobOfTheDay } from "./controller";

// Mount routes with their respective controller methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin"),
    validator(validateCreateAPI),
    createJobOfTheDay
  );

export default router; // Export router
