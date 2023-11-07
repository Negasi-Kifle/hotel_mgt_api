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
  is_default_password: boolean;
  is_credential_changed: boolean;
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
    interface IChangeDefaultPswdInput {
      default_pswd: string;
      new_pswd: string;
    }
    interface IChangeStatusInput {
      user_id: string;
      status: string;
    }
    interface IUpdatePersonalInfo {
      first_name: string;
      last_name: string;
      phone_number: string;
      email: string;
    }
    interface IChangePswdInput {
      current_pswd: string;
      new_pswd: string;
    }
    interface IUpdateRole {
      role: string;
    }
  }
}
