import IUsersDoc from "./dto";
import UsersModel from "./model";

/**
 * Data access layer for user-related APIs
 */
export default class UsersDAL {
  // Create user
  static async createUser(
    data: UserRequest.ICreateUserInput
  ): Promise<IUsersDoc> {
    try {
      const user = await UsersModel.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Find user by email or phone number
  static async getByEmailOrPhone(
    emailOrPhone: string
  ): Promise<IUsersDoc | null> {
    try {
      const user = await UsersModel.findOne({
        $or: [
          {
            email: emailOrPhone,
          },
          {
            phone_number: emailOrPhone,
          },
        ],
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Find all users
  static async getAllUsers(): Promise<IUsersDoc[]> {
    try {
      const users = await UsersModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  // Find user by id
  static async getById(id: string): Promise<IUsersDoc | null> {
    try {
      const user = await UsersModel.findById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Change default password
  static async changeDefaultPswd(
    id: string,
    data: UserRequest.IChangeDefaultPswdInput
  ): Promise<IUsersDoc | null> {
    try {
      const user = await UsersModel.findByIdAndUpdate(
        id,
        {
          password: data.new_pswd,
          is_default_password: false,
          default_password: "",
        },
        { runValidators: true, new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
}
