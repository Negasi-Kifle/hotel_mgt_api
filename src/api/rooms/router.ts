import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI } from "./validator";
import { createRoom, getAllRooms } from "./controller";

// Mount routes with their respective controlle methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin"),
    validator(validateCreateAPI),
    createRoom
  )
  .get(protect, roleAuth("Super-Admin", "Receptionist"), getAllRooms);

// Export router
export default router;
