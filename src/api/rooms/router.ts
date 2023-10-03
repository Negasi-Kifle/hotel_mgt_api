import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI } from "./validator";
import { createRoom } from "./controller";

// Mount routes with their respective controlle methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin"),
    validator(validateCreateAPI),
    createRoom
  );

// Export router
export default router;
