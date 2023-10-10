import { Document } from "mongoose";

// Structure of model of Job_of_the_day
export default interface IJOTDDoc extends Document {
  house_keeper: string;
  job: string;
  date: Date;
  time_finished: Date;
  rooms_cleaned: number;
  trol_and_chem_basket: "Yes" | "No";
  corrider_cleaned: "Yes" | "No";
  done: true | false;
  approved_by: string;
}

// Structure of data in incoming data
declare global {
  namespace JOTDRequests {
    interface ICreateInput {
      house_keeper: string;
      job: string;
      date: Date;
    }
    interface IUpdateInput {
      job: string;
      date: Date;
    }
  }
}
