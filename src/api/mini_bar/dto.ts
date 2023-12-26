import { Document } from "mongoose";

// Structure of the minibasr model
export default interface IMiniBarDoc extends Document {
  employee: string;
  rooms_minibar: IRoomsMiniBar[];
  createdAt: Date;
  updatedAt: Date;
}

// Rooms in a mini bar
export interface IRoomsMiniBar extends Document {
  room: string;
  status: "Done" | "Pending";
}

// Structure of incoming data in different requests
declare global {
  namespace MiniBarRequests {
    interface ICreateInput {
      employee: string;
      rooms_minibar: IRoomsMiniBar[];
    }
  }
}
