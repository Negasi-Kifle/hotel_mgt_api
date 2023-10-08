import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI } from "./validator";
import { createLinenType, deleteAll, getAllLinenTypes } from "./controller";

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

// Export router
export default router;
