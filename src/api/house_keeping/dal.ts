import IHKDoc from "./dto";
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
}
