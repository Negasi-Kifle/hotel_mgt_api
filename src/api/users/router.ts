import { Router } from "express";
const router = Router();
import validator from "../../utils/validator";
import { validateCreateUserAPI, validateLoginAPI } from "./validator";
import { createUser, login } from "./controller";

// Mount routes with their handler methods
router.route("/").post(validator(validateCreateUserAPI), createUser);

router.post("/login", validator(validateLoginAPI), login);

// Export
export default router;
