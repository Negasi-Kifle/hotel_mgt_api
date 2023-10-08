import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI } from "./validator";
import { createHK } from "./controller";

// Mount routes with their respective controller methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin", "Admin"),
    validator(validateCreateAPI),
    createHK
  );

// Export router
export default router;
