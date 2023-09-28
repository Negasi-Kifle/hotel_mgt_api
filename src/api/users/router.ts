import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import {
  validateChangeDefPswdAPI,
  validateCreateUserAPI,
  validateLoginAPI,
} from "./validator";
import {
  changeDefaultPswd,
  createUser,
  getAllUsers,
  login,
} from "./controller";

// Mount routes with their handler methods
router
  .route("/")
  .post(validator(validateCreateUserAPI), createUser)
  .get(protect, roleAuth("Super-Admin", "Supervisor"), getAllUsers);

router.post("/login", validator(validateLoginAPI), login);

router.patch(
  "/defaultpswd",
  protect,
  validator(validateChangeDefPswdAPI),
  changeDefaultPswd
);

// Export
export default router;
