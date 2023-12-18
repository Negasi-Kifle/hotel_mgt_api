import { Router } from "express";
const router = Router();
import protect from "../../authorization/protect";
import roleAuth from "../../authorization/roleAuth";
import validator from "../../utils/validator";
import {
  validateHousekeeperTaskAPI,
  validateGetByHKAndDate,
  validateIsApproved,
  validateIsCleaned,
  validateUpdateAPI,
  validateSupervisorTaskAPI,
  validateSupervisorTaskAPI2,
  validateRemoveSupervisor,
} from "./validator";
import {
  createHousekeeperTask,
  deleteAll,
  deleteById,
  getAllHKsInDB,
  getByHKAndTaskDate,
  getByHouseKeeper,
  getById,
  getBySupervisor,
  getByTaskDate,
  HKsWithoutSupervisor,
  getTasksByType,
  updateHKDetail,
  updateIsApproved,
  updateIsCleaned,
  createSupervisingTask,
  removeSupervisor,
} from "./controller";

// Mount routes with their respective controller methods
router
  .route("/")
  .post(
    protect,
    roleAuth("Super-Admin", "Admin"),
    validator(validateHousekeeperTaskAPI),
    createHousekeeperTask
  )
  .get(
    protect,
    roleAuth("Super-Admin", "Housekeeper", "Supervisor"),
    getAllHKsInDB
  )
  .delete(protect, roleAuth("Super-Admin"), deleteAll);

router.post(
  "/supervising",
  protect,
  roleAuth("Super-Admin", "Receptionist"),
  validator(validateSupervisorTaskAPI2),
  createSupervisingTask
);

router.get(
  "/tasksbytype",
  protect,
  roleAuth("Super-Admin", "Receptionist", "Supervisor", "Housekeeper"),
  getTasksByType
);

router.get(
  "/taskdate",
  protect,
  roleAuth("Super-Admin", "Admin", "Receptionist"),
  getByTaskDate
);

router.patch(
  "/removesupervisor",
  protect,
  validator(validateRemoveSupervisor),
  removeSupervisor
);

router.get("/hkswithoutsupervisor", protect, HKsWithoutSupervisor);

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
  roleAuth("Super-Admin", "Admin", "Housekeeper", "Supervisor"),
  getByHouseKeeper
);

router.get(
  "/supervisingtasks/:id",
  protect,
  roleAuth("Supervisor", "Super-Admin", "Admin"),
  getBySupervisor
);

router
  .route("/:taskId")
  .get(protect, getById)
  .delete(protect, roleAuth("Super-Admin"), deleteById)
  .patch(
    protect,
    roleAuth("Super-Admin"),
    validator(validateUpdateAPI),
    updateHKDetail
  );

router.patch(
  "/iscleaned/:id",
  protect,
  roleAuth("Housekeeper", "Super-Admin"),
  validator(validateIsCleaned),
  updateIsCleaned
);

router.patch(
  "/approval/:id",
  protect,
  protect,
  roleAuth("Super-Admin", "Supervisor"),
  validator(validateIsApproved),
  updateIsApproved
);

// Export router
export default router;
