import Router from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import { validateCreateAPI, validateUpdateAPI } from "./validator";
import {
  createMinibar,
  getAllMinibars,
  getByEmp,
  getById,
  getByTaskDate,
  updateMinibar,
} from "./controller";

// Mount routes with their respective controller methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin"),
    validator(validateCreateAPI),
    createMinibar
  )
  .get(protect, roleAuth("Super-Admin"), getAllMinibars);

router.get(
  "/taskdate",
  protect,
  roleAuth("Super-Admin", "Admin"),
  getByTaskDate
);

router
  .route("/:id")
  .get(protect, roleAuth("Super-Admin", "Admin"), getById)
  .patch(
    protect,
    roleAuth("Super-Admin", "Admin"),
    validator(validateUpdateAPI),
    updateMinibar
  );

router
  .route("/employee/:empId")
  .get(protect, roleAuth("Super-Admin", "Admin"), getByEmp);

// Export router
export default router;
