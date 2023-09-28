import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateUserAPI, validateLoginAPI } from "./validator";
import { createUser, getAllUsers, login } from "./controller";

// Mount routes with their handler methods
router
  .route("/")
  .post(validator(validateCreateUserAPI), createUser)
  .get(protect, roleAuth("Super-Admin"), getAllUsers);

router.post("/login", validator(validateLoginAPI), login);

// Export
export default router;
