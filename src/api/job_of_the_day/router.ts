import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI } from "./validator";
import { createJobOfTheDay, getAllInDB, getById } from "./controller";

// Mount routes with their respective controller methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin"),
    validator(validateCreateAPI),
    createJobOfTheDay
  )
  .get(protect, roleAuth("Super-Admin", "Supervisor"), getAllInDB);

router
  .route("/:id")
  .get(protect, roleAuth("Super-Admin", "Housekeeper", "Supervisor"), getById);

export default router; // Export router
