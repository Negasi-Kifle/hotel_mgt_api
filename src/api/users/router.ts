import { Router } from "express";
const router = Router();
import validator from "../../utils/validator";
import { validateCreateUserAPI } from "./validator";
import { createUser } from "./controller";

// Mount routes with their handler methods
router.route("/").post(validator(validateCreateUserAPI), createUser);

// Export
export default router;
