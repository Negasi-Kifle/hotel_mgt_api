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
}
