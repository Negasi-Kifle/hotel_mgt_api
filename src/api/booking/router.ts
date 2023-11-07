import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import {
  validateCreateAPI,
  validateStatusAPI,
  validateUpdateAPI,
} from "./validator";
import {
  createBooking,
  deleteAll,
  deleteById,
  getAllBookings,
  getById,
  getByStatus,
  getFreeRooms,
  getRoomsResvInDate,
  updateInfo,
  updateStatus,
} from "./controller";

// Mount roles with their  respective controller method
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin", "Receptionist"),
    validator(validateCreateAPI),
    createBooking
  )
  .get(protect, getAllBookings)
  .delete(protect, roleAuth("Super-Admin"), deleteAll);

router.get("/freerooms", protect, getFreeRooms);
router.get("/reservedrooms", protect, getRoomsResvInDate);

router.patch(
  "/:bookingId/status",
  protect,
  roleAuth("Super-Admin"),
  validator(validateStatusAPI),
  updateStatus
);

router.get("/status", protect, getByStatus);

router
  .route("/:bookingId")
  .get(protect, getById)
  .patch(
    protect,
    roleAuth("Super-Admin", "Receptionist"),
    validator(validateUpdateAPI),
    updateInfo
  )
  .delete(protect, roleAuth("Super-Admin"), deleteById);

// Export router
export default router;
