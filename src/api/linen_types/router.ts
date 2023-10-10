import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI, validateUpdateAPI } from "./validator";
import {
  createLinenType,
  deleteAll,
  deleteById,
  getAllLinenTypes,
  getById,
  updateLinenType,
} from "./controller";

// Mount routes with their respective controller methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin"),
    validator(validateCreateAPI),
    createLinenType
  )
  .get(protect, getAllLinenTypes)
  .delete(protect, roleAuth("Super-Admin", "Admin"), deleteAll);

router
  .route("/:id")
  .get(protect, getById)
  .delete(protect, roleAuth("Super-Admin"), deleteById)
  .patch(
    protect,
    roleAuth("Super-Admin", "Admin"),
    validator(validateUpdateAPI),
    updateLinenType
  );

// Export router
export default router;
