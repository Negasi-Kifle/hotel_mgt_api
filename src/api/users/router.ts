import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import {
  validateChangeDefPswdAPI,
  validateCreateUserAPI,
  validateLoginAPI,
  validateStatusAPI,
} from "./validator";
import {
  changeDefaultPswd,
  changeStatus,
  createUser,
  deleteAllUsers,
  getAllUsers,
  login,
} from "./controller";

// Mount routes with their handler methods
router
  .route("/")
  .post(validator(validateCreateUserAPI), createUser)
  .get(protect, roleAuth("Super-Admin", "Supervisor"), getAllUsers)
  .delete(deleteAllUsers);

router.post("/login", validator(validateLoginAPI), login);

router.patch(
  "/defaultpswd",
  protect,
  validator(validateChangeDefPswdAPI),
  changeDefaultPswd
);

router.patch(
  "/status",
  protect,
  roleAuth("Super-Admin"),
  validator(validateStatusAPI),
  changeStatus
);

// Export
export default router;
