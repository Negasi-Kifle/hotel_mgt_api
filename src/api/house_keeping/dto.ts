import { Document } from "mongoose";
import IRoomsDoc from "../rooms/dto";

// Structure for house_keeping model
export default interface IHKDoc extends Document {
  house_keeper: string;
  supervisor: string;
  task_date: Date;
  rooms_task: IRoomsTask[];
}

// Interface for rooms and tasks
export interface IRoomsTask {
  room: IRoomsDoc;
  task: "Clean" | "Full";
  linens_used: ILinensUsed[];
  is_cleaned: true | false;
  is_approved: true | false;
}

// Interface for linens used
export interface ILinensUsed {
  linen_type: string;
  amount: number;
}

// Structure of data in incoming requests
declare global {
  namespace HKRequests {
    interface ICreateInput {
      house_keeper: string;
      supervisor: string;
      task_date: Date;
      rooms_task: IRoomsTask;
    }
    interface IUpdateIsCleanedInput {
      room: string;
      is_cleaned: true | false;
      linens_used: ILinensUsed[];
    }
    interface IUpdateIsApprovedInput {
      room: string;
      is_approved: true | false;
    }
  }
}
