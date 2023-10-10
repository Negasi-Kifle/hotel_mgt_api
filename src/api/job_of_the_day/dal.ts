import JobOfTheDay from "./model";
import IJOTDDoc from "./dto";

// Data access layer
export default class JobOfTheDayDAL {
  // Create
  static async createJobOfTheDay(
    data: JOTDRequests.ICreateInput
  ): Promise<IJOTDDoc> {
    try {
      const jobOfTheDay = await JobOfTheDay.create(data);
      return jobOfTheDay;
    } catch (error) {
      throw error;
    }
  }
}
