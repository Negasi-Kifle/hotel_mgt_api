import { RequestHandler } from "express";
import HK from "./dal";
import Users from "../users/dal";
import AppError from "../../utils/app_error";
import HouseKeeping from "./model";
import IUsersDoc from "../users/dto";
import LinenDAL from "../linen_types/dal";
import RoomsDAL from "../rooms/dal";

// Create house keeping task for housekeeper
export const createHousekeeperTask: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;

    // Find rooms by room_id and replace the room numbers in the incoming data by the document id
    const roomTasks = data.rooms_task;
    for (let roomTask of roomTasks) {
      const roomByNum = await RoomsDAL.getByRoomNum(roomTask.room);
      if (!roomByNum)
        return next(new AppError("Unknown room number selected", 404));
      data.rooms_task.forEach((incomingRoomTask: any, index: number) => {
        if (incomingRoomTask.room === roomByNum.room_id)
          data.rooms_task[index]["room"] = roomByNum.id;
      });
    }

    // Check house keeper exists
    const houseKeeper = await Users.getById(data.house_keeper);
    if (!houseKeeper)
      return next(new AppError("Housekeeper does not exist", 404));

    // Sepcify task is "Housekeeping"
    data.hk_or_supervising = "Housekeeping";

    // Create house keeping
    const houseKeeping = await HK.createHK(data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `The housekeeping task has been successfully created for ${houseKeeper.first_name}`,
      data: { houseKeeping },
    });
  } catch (error) {
    next(error);
  }
};

// Create house keeping task for supervisor
export const createSupervisorTask: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;

    // Find rooms by room_id and replace the room numbers in the incoming data by the document id
    const roomTasks = data.rooms_task;
    for (let roomTask of roomTasks) {
      const roomByNum = await RoomsDAL.getByRoomNum(roomTask.room);
      if (!roomByNum)
        return next(new AppError("Unknown room number selected", 404));
      data.rooms_task.forEach((incomingRoomTask: any, index: number) => {
        if (incomingRoomTask.room === roomByNum.room_id)
          data.rooms_task[index]["room"] = roomByNum.id;
      });
    }

    // Check supervisor exists
    const supervisor = await Users.getById(data.house_keeper);
    if (!supervisor)
      return next(new AppError("Supervisor does not exist", 404));

    // Sepcify task is "Supervising"
    data.hk_or_supervising = "Supervising";

    // Create house keeping
    const supervising = await HK.createHK(data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: `The supervising task has been successfully created for ${supervisor.first_name}`,
      data: { supervising },
    });
  } catch (error) {
    next(error);
  }
};

// Get all housekeepings in DB
export const getAllHKsInDB: RequestHandler = async (req, res, next) => {
  try {
    const houseKeepings = await HK.getAllHKsInDB();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: houseKeepings.length,
      data: { houseKeepings },
    });
  } catch (error) {
    next(error);
  }
};

// Get by id
export const getById: RequestHandler = async (req, res, next) => {
  try {
    const houseKeeping = await HK.getByTaskId(req.params.taskId);
    if (!houseKeeping)
      return next(new AppError("Housekeeping task not found", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      data: { houseKeeping },
    });
  } catch (error) {
    next(error);
  }
};

// Get all housekeepings in specific date (by task date)
export const getByTaskDate: RequestHandler = async (req, res, next) => {
  try {
    if (!req.query.task_date)
      return next(new AppError("Please select task date", 400));

    const task_date = new Date(req.query.task_date as string);
    const houseKeepings = await HK.getByTaskDate(task_date);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: houseKeepings.length,
      data: { houseKeepings },
    });
  } catch (error) {
    next(error);
  }
};

// Get housekeepings by housekeeper and task_date
export const getByHKAndTaskDate: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const housekeepings = await HK.getByHkAndTaskDate(
      req.params.id,
      data.task_date
    );

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: housekeepings.length,
      data: { housekeepings },
    });
  } catch (error) {
    next(error);
  }
};

// Get all tasks of a housekeeper
export const getByHouseKeeper: RequestHandler = async (req, res, next) => {
  try {
    const houseKeepings = await HK.getByHouseKeeper(req.params.id);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      results: houseKeepings.length,
      data: { houseKeepings },
    });
  } catch (error) {
    next(error);
  }
};

// Delete all houseking tasks in DB
export const deleteAll: RequestHandler = async (req, res, next) => {
  try {
    await HK.deleteAll();

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "All houseking tasks in DB have been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete by housekeeping id
export const deleteById: RequestHandler = async (req, res, next) => {
  try {
    const housekeeping = await HK.deleteById(req.params.taskId);
    if (!housekeeping)
      return next(new AppError("Housekeeping task does not exist", 404));

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Houskeeping deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update "is_cleaned"
export const updateIsCleaned: RequestHandler = async (req, res, next) => {
  try {
    const data = <HKRequests.IUpdateIsCleanedInput>req.value; // Incoming data
    const loggedInUser = <IUsersDoc>req.user; // Logged in user

    // Check housekeeping document exists
    const hk = await HK.getByTaskId(req.params.id);
    if (!hk) {
      return next(new AppError("Housekeeping document does not exist", 404));
    }

    // Check the logged in user is the assigned housekeeper
    if (loggedInUser.id !== hk.house_keeper) {
      return next(new AppError("You are not assigned for this task", 400));
    }

    // Find the selected room
    const hkRooms = hk.rooms_task;

    const roomToBeUpdated = hkRooms.find((room) => {
      return room.room.id === data.room;
    });
    if (!roomToBeUpdated) {
      return next(new AppError("Room does not exist in the task", 404));
    }

    // Update linens_used
    if (data.linens_used && data.linens_used.length !== 0) {
      // Check each linen exists
      for (let linen of data.linens_used) {
        const linenInDB = await LinenDAL.getById(linen.linen_type);
        if (!linenInDB)
          return next(new AppError("Unknown linen type selected", 404));
      }

      roomToBeUpdated.linens_used = data.linens_used; // Updates linens_used field
    }

    roomToBeUpdated.is_cleaned = data.is_cleaned; // Update is_cleaned

    // Update the housekeeping document
    const housekeeping = await HK.updateIsCleaned(req.params.id, hkRooms);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Cleanness of updated successfully",
      data: { housekeeping },
    });
  } catch (error) {
    next(error);
  }
};

// Update is_approved
export const updateIsApproved: RequestHandler = async (req, res, next) => {
  try {
    const data = <HKRequests.IUpdateIsApprovedInput>req.value; // Incoming data
    const loggedInUser = <IUsersDoc>req.user; // Logged in user

    // Check housekeeping document exists
    const hk = await HK.getByTaskId(req.params.id);
    if (!hk) {
      return next(new AppError("Housekeeping document does not exist", 404));
    }

    // Check the logged in user is the assigned supervisor
    if (loggedInUser.id !== hk.supervisor) {
      return next(
        new AppError("You are not assigned to supervise this task", 400)
      );
    }

    // Find the selected room
    const hkRooms = hk.rooms_task;

    const roomToBeUpdated = hkRooms.find((room) => {
      return room.room.id === data.room;
    });
    if (!roomToBeUpdated) {
      return next(new AppError("Room does not exist in the task", 404));
    }

    roomToBeUpdated.is_approved = data.is_approved; // Update is_cleaned

    // Update the housekeeping document
    const housekeeping = await HK.updateIsApproved(req.params.id, hkRooms);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Approval of room cleanness updated successfully",
      data: { housekeeping },
    });
  } catch (error) {
    next(error);
  }
};

// Update housekeeping detail
export const updateHKDetail: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;

    // Find rooms by room_id and replace the room numbers in the incoming data by the document id
    const roomTasks = data.rooms_task;
    for (let roomTask of roomTasks) {
      const roomByNum = await RoomsDAL.getByRoomNum(roomTask.room);
      if (!roomByNum)
        return next(new AppError("Unknown room number selected", 404));
      data.rooms_task.forEach((incomingRoomTask: any, index: number) => {
        if (incomingRoomTask.room === roomByNum.room_id)
          data.rooms_task[index]["room"] = roomByNum.id;
      });
    }

    // Check house keeper exists
    const houseKeeper = await Users.getById(data.house_keeper);
    if (!houseKeeper)
      return next(new AppError("Housekeeper does not exist", 404));

    // Update house keeping
    const houseKeeping = await HK.updateHKDetail(req.params.taskId, data);

    // Response
    res.status(200).json({
      status: "SUCCESS",
      message: "Housekeeping task updated successfully",
      data: { houseKeeping },
    });
  } catch (error) {
    next(error);
  }
};
