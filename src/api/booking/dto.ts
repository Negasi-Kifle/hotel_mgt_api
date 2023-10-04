import { Document } from "mongoose";

// Structure of reservation model
export default interface IBookingDoc extends Document {
  first_name: string;
  last_name: string;
  id_num: string;
  phone_num: string;
  room_id: string;
  arr_date: Date;
  arr_time: String;
  dep_date: Date;
  dep_time: string;
  status: string;
}

// Structure of data of incoming requests
declare global {
  namespace BookingRequest {
    interface ICreateInput {
      first_name: string;
      last_name: string;
      id_num: string;
      phone_num: string;
      room_id: string;
      arr_date: Date;
      dep_date: Date;
    }
    interface IUpdateInfoInput {
      first_name: string;
      last_name: string;
      id_num: string;
      phone_num: string;
    }
  }
}
