import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI, validateGetByHKAndDate } from "./validator";
import {
  createHK,
  deleteAll,
  getAllHKsInDB,
  getByHKAndTaskDate,
  getByHouseKeeper,
  getById,
  getByTaskDate,
} from "./controller";

// Mount routes with their respective controller methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin", "Admin"),
    validator(validateCreateAPI),
    createHK
  )
  .get(protect, roleAuth("Super-Admin"), getAllHKsInDB)
  .delete(protect, roleAuth("Super-Admin"), deleteAll);

router.get(
  "/taskdate",
  protect,
  roleAuth("Super-Admin", "Admin", "Receptionist"),
  getByTaskDate
);

router.get(
  "/hkandtaskdate/:id",
  protect,
  roleAuth("Super-Admin", "Admin", "Receptionist"),
  validator(validateGetByHKAndDate),
  getByHKAndTaskDate
);

router.get(
  "/hktasks/:id",
  protect,
  roleAuth("Super-Admin", "Admin"),
  getByHouseKeeper
);

router.route("/:taskId").get(protect, getById);

// Export router
export default router;
