import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI, validateUpdateAPI } from "./validator";
import {
  createJobOfTheDay,
  getAllInDB,
  getById,
  updateInfo,
} from "./controller";

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
  .get(protect, roleAuth("Super-Admin", "Housekeeper", "Supervisor"), getById)
  .patch(
    protect,
    roleAuth("Super-Admin", "Receptionist"),
    validator(validateUpdateAPI),
    updateInfo
  );

export default router; // Export router
