import moment from "moment";
import IHKDoc, { IRoomsTask } from "./dto";
import HouseKeeping from "./model";

// Data access layer for house keeping model
export default class HouseKeepingDAL {
  // Create house keeping
  static async createHK(data: HKRequests.ICreateInput): Promise<IHKDoc> {
    try {
      const houseKeeping = await HouseKeeping.create(data);
      return houseKeeping;
    } catch (error) {
      throw error;
    }
  }

  // Get all housekeepings
  static async getAllHKsInDB(): Promise<IHKDoc[]> {
    try {
      const hks = await HouseKeeping.find()
        .populate({ path: "house_keeper", select: "first_name last_name" })
        .populate({ path: "supervisor", select: "first_name last_name" })
        .populate({ path: "rooms_task.room", select: "room_id" })
        .sort("-task_date");
      return hks;
    } catch (error) {
      throw error;
    }
  }

  // Get by id
  static async getByTaskId(id: string): Promise<IHKDoc | null> {
    try {
      const houseKeeping = await HouseKeeping.findById(id)
        .populate({ path: "house_keeper", select: "first_name last_name" })
        .populate({ path: "supervisor", select: "first_name last_name" })
        .populate({ path: "rooms_task.room", select: "room_id" })
        .sort("-task_date");
      return houseKeeping;
    } catch (error) {
      throw error;
    }
  }

  // Get by id
  static async getHousekeeping(id: string): Promise<IHKDoc | null> {
    try {
      const houseKeeping = await HouseKeeping.findById(id).sort("-task_date");
      return houseKeeping;
    } catch (error) {
      throw error;
    }
  }

  // Get housekeepings by task date
  static async getByTaskDate(task_date: Date): Promise<IHKDoc[]> {
    try {
      const houseKeepings = await HouseKeeping.find({ task_date })
        .sort("-task_date")
        .populate({ path: "house_keeper", select: "first_name last_name" })
        .populate({ path: "supervisor", select: "first_name last_name" })
        .populate({ path: "rooms_task.room", select: "room_id" })
        .sort("-task_date");
      return houseKeepings;
    } catch (error) {
      throw error;
    }
  }

  // Get by housekeeper and task_date
  static async getByHkAndTaskDate(
    hk: string,
    task_date: Date
  ): Promise<IHKDoc[]> {
    try {
      const houseKeepings = await HouseKeeping.find({
        $and: [{ house_keeper: hk }, { task_date }],
      })
        .populate({ path: "house_keeper", select: "first_name last_name" })
        .populate({ path: "supervisor", select: "first_name last_name" })
        .populate({ path: "rooms_task.room", select: "room_id" })
        .sort("-task_date");
      return houseKeepings;
    } catch (error) {
      throw error;
    }
  }

  // Get all tasks of a housekeeper
  static async getByHouseKeeper(
    house_keeper: string,
    selected_date?: string
  ): Promise<IHKDoc[]> {
    try {
      if (selected_date) {
        const selctedDate = moment(new Date(selected_date)).format(
          "YYYY-MM-DD"
        );
        const tasks = await HouseKeeping.find({
          $and: [{ house_keeper }, { task_date: { $eq: selctedDate } }],
        })
          .populate({ path: "house_keeper", select: "first_name last_name" })
          .populate({ path: "supervisor", select: "first_name last_name" })
          .populate({ path: "rooms_task.room", select: "room_id" })
          .sort("-task_date");
        return tasks;
      } else {
        const tasks = await HouseKeeping.find({ house_keeper })
          .populate({ path: "house_keeper", select: "first_name last_name" })
          .populate({ path: "supervisor", select: "first_name last_name" })
          .populate({ path: "rooms_task.room", select: "room_id" })
          .sort("-task_date");
        return tasks;
      }
    } catch (error) {
      throw error;
    }
  }

  // Get all tasks of a housekeeper
  static async getBySupervisor(
    supervisor: string,
    selected_date?: string
  ): Promise<IHKDoc[]> {
    try {
      if (selected_date) {
        const selctedDate = moment(new Date(selected_date)).format(
          "YYYY-MM-DD"
        );
        const tasks = await HouseKeeping.find({
          $and: [
            { supervisor },
            { task_date: { $eq: selctedDate } },
            { hk_or_supervising: "Supervising" },
          ],
        })
          .populate({ path: "house_keeper", select: "first_name last_name" })
          .populate({ path: "supervisor", select: "first_name last_name" })
          .populate({ path: "rooms_task.room", select: "room_id" })
          .sort("-task_date");
        return tasks;
      } else {
        const tasks = await HouseKeeping.find({
          $and: [{ supervisor }, { hk_or_supervising: "Supervising" }],
        })
          .populate({ path: "house_keeper", select: "first_name last_name" })
          .populate({ path: "supervisor", select: "first_name last_name" })
          .populate({ path: "rooms_task.room", select: "room_id" })
          .sort("-task_date");
        return tasks;
      }
    } catch (error) {
      throw error;
    }
  }

  // Delete all housekeeping data
  static async deleteAll() {
    try {
      await HouseKeeping.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  // Delete by id
  static async deleteById(id: string): Promise<IHKDoc | null> {
    try {
      const houseKeeping = await HouseKeeping.findByIdAndDelete(id);
      return houseKeeping;
    } catch (error) {
      throw error;
    }
  }

  // Update is_cleaned
  static async updateIsCleaned(
    id: string,
    rooms_task: IRoomsTask[]
  ): Promise<IHKDoc | null> {
    try {
      const houseKeeping = await HouseKeeping.findByIdAndUpdate(
        id,
        { rooms_task },
        { runValidators: true, new: true }
      );
      return houseKeeping;
    } catch (error) {
      throw error;
    }
  }

  // Update is_approved
  static async updateIsApproved(
    id: string,
    rooms_task: IRoomsTask[]
  ): Promise<IHKDoc | null> {
    try {
      const housekeeping = await HouseKeeping.findByIdAndUpdate(
        id,
        { rooms_task },
        { runValidators: true, new: true }
      );
      return housekeeping;
    } catch (error) {
      throw error;
    }
  }

  // Update housekeeping task detail
  static async updateHKDetail(
    id: string,
    data: HKRequests.IUpdateInput
  ): Promise<IHKDoc | null> {
    try {
      const houseKeeping = await HouseKeeping.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });
      return houseKeeping;
    } catch (error) {
      throw error;
    }
  }

  // Get by tasks type
  static async getTasksByType(hk_or_supervising: string): Promise<IHKDoc[]> {
    try {
      if (hk_or_supervising === "Supervising") {
        const task = await HouseKeeping.find({ hk_or_supervising }).populate({
          path: "supervisor",
        });
        return task;
      } else {
        const task = await HouseKeeping.find({ hk_or_supervising }).populate({
          path: "house_keeper",
        });

        return task;
      }
    } catch (error) {
      throw error;
    }
  }
}
