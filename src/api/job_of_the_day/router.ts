import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI, validateUpdateAPI } from "./validator";
import {
  createJobOfTheDay,
  deleteAll,
  deleteById,
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
  .get(protect, roleAuth("Super-Admin", "Supervisor"), getAllInDB)
  .delete(protect, roleAuth("Super-Admin"), deleteAll);

router
  .route("/:id")
  .get(protect, roleAuth("Super-Admin", "Housekeeper", "Supervisor"), getById)
  .patch(
    protect,
    roleAuth("Super-Admin", "Receptionist"),
    validator(validateUpdateAPI),
    updateInfo
  )
  .delete(protect, roleAuth("Super-Admin"), deleteById);

export default router; // Export router
