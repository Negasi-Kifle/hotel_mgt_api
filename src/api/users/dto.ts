import { Document } from "mongoose";

/**
 * Interface for the users doc
 */
export default interface IUsersDoc extends Document {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  default_password: string;
  is_default_password: string;
  password_changed_at: Date;
  role: string;
  status: string;
  checkPassword: (plainPassword: string, hashedPassword: string) => boolean;
}

declare global {
  namespace UserRequest {
    interface ICreateUserInput {
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
      password: string;
      default_password: string;
      role: string;
    }
    interface ILoginInput {
      email_or_phone: string;
      password: string;
    }
  }
}
