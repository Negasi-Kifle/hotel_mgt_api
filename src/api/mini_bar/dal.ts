import IMiniBarDoc from "./dto";
import Minibar from "./model";

/**
 * Data access layer for minibar related data
 */
export default class MinibarDAL {
  // Create minibar
  static async create(
    data: MiniBarRequests.ICreateInput
  ): Promise<IMiniBarDoc> {
    try {
      const minibar = await Minibar.create(data);
      return minibar;
    } catch (error) {
      throw error;
    }
  }

  // Get all mini bar tasks
  static async getAllMinibars(): Promise<IMiniBarDoc[]> {
    try {
      const minibars = await Minibar.find()
        .populate({
          path: "employee",
          select: "first_name last_name phone_number",
        })
        .populate({ path: "rooms_minibar.room", select: "room_id room_floor" });
      return minibars;
    } catch (error) {
      throw error;
    }
  }

  // Get minibar by id
  static async getBYId(id: string): Promise<IMiniBarDoc | null> {
    try {
      const minibar = await Minibar.findById(id)
        .populate({
          path: "employee",
          select: "first_name last_name phone_number",
        })
        .populate({ path: "rooms_minibar.room", select: "room_id room_floor" });
      return minibar;
    } catch (error) {
      throw error;
    }
  }

  // Get by employee
  static async getByEmp(employee: string): Promise<IMiniBarDoc[]> {
    try {
      const minibars = await Minibar.find({ employee })
        .populate({
          path: "employee",
          select: "first_name last_name phone_number",
        })
        .populate({ path: "rooms_minibar.room", select: "room_id room_floor" });
      return minibars;
    } catch (error) {
      throw error;
    }
  }

  // Get minibar by task date
  static async getByTaskDate(task_date: string): Promise<IMiniBarDoc[]> {
    try {
      const minibars = await Minibar.find({ task_date: new Date(task_date) });
      return minibars;
    } catch (error) {
      throw error;
    }
  }

  // Update minibar
  static async updateMinibar(
    id: string,
    data: MiniBarRequests.IUpdateInput
  ): Promise<IMiniBarDoc | null> {
    try {
      const minibar = await Minibar.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      })
        .populate({
          path: "employee",
          select: "first_name last_name phone_number",
        })
        .populate({ path: "rooms_minibar.room", select: "room_id room_floor" });
      return minibar;
    } catch (error) {
      throw error;
    }
  }
}
