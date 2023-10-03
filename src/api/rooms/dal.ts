import IRoomsDoc from "./dto";
import Rooms from "./model";

// Data access layer for rooms data
export default class RoomsDAL {
  // Create rooms
  static async createRoom(data: RoomRequest.ICreateInput): Promise<IRoomsDoc> {
    try {
      const room = await Rooms.create(data);
      return room;
    } catch (error) {
      throw error;
    }
  }

  // Get all rooms
  static async getAllRooms(): Promise<IRoomsDoc[]> {
    try {
      const rooms = await Rooms.find();
      return rooms;
    } catch (error) {
      throw error;
    }
  }
}
