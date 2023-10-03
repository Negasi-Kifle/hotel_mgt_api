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

  // Get by id
  static async getById(id: string): Promise<IRoomsDoc | null> {
    try {
      const room = await Rooms.findById(id);
      return room;
    } catch (error) {
      throw error;
    }
  }

  // Upate room info
  static async updateRoomInfo(
    id: string,
    data: RoomRequest.IUpdateInfoInput
  ): Promise<IRoomsDoc | null> {
    try {
      const room = await Rooms.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });
      return room;
    } catch (error) {
      throw error;
    }
  }

  // Update room status
  static async updateRoomStatus(
    id: string,
    room_status: RoomRequest.IUpdateStatusInput
  ): Promise<IRoomsDoc | null> {
    try {
      const room = await Rooms.findByIdAndUpdate(
        id,
        { room_status },
        { runValidators: true, new: true }
      );
      return room;
    } catch (error) {
      throw error;
    }
  }

  // Delete all rooms
  static async deleteAll() {
    try {
      await Rooms.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  // Delete room by id
  static async deleteById(id: string): Promise<IRoomsDoc | null> {
    try {
      const room = await Rooms.findByIdAndDelete(id);
      return room;
    } catch (error) {
      throw error;
    }
  }
}
