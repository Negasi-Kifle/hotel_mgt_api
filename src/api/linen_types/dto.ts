import { Document } from "mongoose";

// Structure of linen model
export default interface ILinenTypesDoc {
  linen_type: string;
  linen_slug: string;
  color_code: string;
}

// Structure of data in incoming data
declare global {
  namespace LinenTypeRequests {
    interface ICreateInput {
      linen_type: string;
      linen_slug: string;
      color_code: string;
    }
    interface IUpdateInput {
      linen_type: string;
      linen_slug: string;
      color_code: string;
    }
  }
}
