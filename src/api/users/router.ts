import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import {
  validateChangeDefPswdAPI,
  validateChangePswdAPI,
  validateCreateUserAPI,
  validateLoginAPI,
  validatePersonalInfoAPI,
  validateStatusAPI,
} from "./validator";
import {
  changeDefaultPswd,
  changePswd,
  changeStatus,
  createUser,
  deleteAllUsers,
  deleteById,
  getAllUsers,
  getUserById,
  login,
  resetPswd,
  showPersonalInfo,
  updatePersonalInfo,
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

router
  .route("/personalinfo")
  .patch(protect, validator(validatePersonalInfoAPI), updatePersonalInfo)
  .get(protect, showPersonalInfo);

router.patch(
  "/password",
  protect,
  validator(validateChangePswdAPI),
  changePswd
);

router.patch("/:userId/reset", protect, roleAuth("Super-Admin"), resetPswd);

router
  .route("/:userId")
  .get(protect, roleAuth("Super-Admin"), getUserById)
  .delete(protect, roleAuth("Super-Admin"), deleteById);

// Export
export default router;
