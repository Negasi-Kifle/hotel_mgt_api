import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import {
  validateCreateAPI,
  validateUpdateAPI,
  validateUpdateStatusAPI,
} from "./validator";
import {
  createRoom,
  deleteAll,
  deleteById,
  getAllRooms,
  getById,
  updateRoomInfo,
  updateStatus,
} from "./controller";

// Mount routes with their respective controlle methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin"),
    validator(validateCreateAPI),
    createRoom
  )
  .get(protect, roleAuth("Super-Admin", "Receptionist"), getAllRooms)
  .delete(protect, roleAuth("Super-Admin"), deleteAll);

router
  .route("/:roomId")
  .get(protect, roleAuth("Super-Admin", "Supervisor", "Receptionist"), getById)
  .patch(
    protect,
    roleAuth("Super-Admin"),
    validator(validateUpdateAPI),
    updateRoomInfo
  )
  .delete(protect, roleAuth("Super-Admin"), deleteById);

router.patch(
  "/status/:roomId",
  protect,
  roleAuth("Super-Admin", "Supervisor", "House-Keeper"),
  validator(validateUpdateStatusAPI),
  updateStatus
);

// Export router
export default router;
