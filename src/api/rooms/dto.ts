import { Document } from "mongoose";

// Interface for the mongoDB document of rooms model
export default interface IRoomsDoc extends Document {
  room_id: string;
  room_type: string;
  room_price: number;
  room_floor: string;
  room_status: string;
}

// Structure of incoming requests
declare global {
  namespace RoomRequest {
    interface ICreateInput {
      room_id: string;
      room_type: string;
      room_price: number;
      room_floor: string;
      room_status: string;
    }
    interface IUpdateInfoInput {
      room_id: string;
      room_type: string;
      room_price: number;
      room_floor: string;
    }
    interface IUpdateStatusInput {
      room_status: string;
    }
  }
}
