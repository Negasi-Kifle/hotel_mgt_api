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
}
