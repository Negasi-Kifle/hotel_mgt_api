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
        $and: [
          {
            $or: [
              {
                email: emailOrPhone,
              },
              {
                phone_number: emailOrPhone,
              },
            ],
          },
          {
            status: "Active",
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

  // Get user by id
  static async getUserById(id: string): Promise<IUsersDoc | null> {
    try {
      const user = await UsersModel.findById(id);
      return user;
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
    user: IUsersDoc,
    data: UserRequest.IChangeDefaultPswdInput
  ): Promise<IUsersDoc> {
    try {
      user.password = data.new_pswd;
      user.is_default_password = false;
      user.default_password = "";
      user.is_credential_changed = true;
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Delete all users in DB
  static async deleteAllusers() {
    try {
      await UsersModel.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  // Delete user by id
  static async deleteById(id: string): Promise<IUsersDoc | null> {
    try {
      const user = await UsersModel.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Change user status
  static async changeStatus(
    data: UserRequest.IChangeStatusInput
  ): Promise<IUsersDoc | null> {
    try {
      const user = await UsersModel.findByIdAndUpdate(
        data.user_id,
        { status: data.status },
        { runValidators: true, new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Update personal info
  static async updateUserInfo(
    id: string,
    data: UserRequest.IUpdatePersonalInfo
  ): Promise<IUsersDoc | null> {
    try {
      const user = await UsersModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Change password
  static async changePswd(
    user: IUsersDoc,
    new_pswd: string
  ): Promise<IUsersDoc> {
    try {
      user.password = new_pswd; //
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Reset password
  static async resetPswd(
    user: IUsersDoc,
    new_pswd: string
  ): Promise<IUsersDoc> {
    try {
      user.password = new_pswd;
      user.default_password = new_pswd;
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
}
