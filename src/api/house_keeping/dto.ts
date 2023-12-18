import { Document } from "mongoose";
import IRoomsDoc from "../rooms/dto";

// Structure for house_keeping model
export default interface IHKDoc extends Document {
  house_keeper: string;
  supervisor: string;
  task_date: Date;
  rooms_task: IRoomsTask[];
  hk_or_supervising: "Housekeeping" | "Supervising";
}

// Interface for rooms and tasks
export interface IRoomsTask extends Document {
  room: IRoomsDoc;
  task: "Clean" | "Full";
  linens_used: ILinensUsed[];
  is_cleaned: true | false;
  is_approved: true | false;
  supervisor?: string;
}

// Interface for linens used
export interface ILinensUsed {
  linen_type: string;
  amount: number;
}

// Structure of incoming data for creating supervising task
export interface IHKAndRoomTask {
  hk_id: string;
  room_task_id: string;
}

// Structure of data in incoming requests
declare global {
  namespace HKRequests {
    interface ICreateInput {
      house_keeper: string;
      task_date: Date;
      rooms_task: IRoomsTask[];
      hk_or_supervising: "Housekeeping" | "Supervising";
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
    interface IUpdateInput {
      house_keeper: string;
      task_date: Date;
      rooms_task: IRoomsTask[];
    }
    interface ICreateSupervisingTask {
      hks_and_room_tasks: IHKAndRoomTask[];
      supervisor: string;
    }
    interface IRemoveSupervisor {
      hk_id: string;
      hk_task_id: string;
    }
  }
}
