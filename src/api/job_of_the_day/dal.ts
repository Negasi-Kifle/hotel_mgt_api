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

  // Get all job_of_the_day
  static async getAll(): Promise<IJOTDDoc[]> {
    try {
      const jobOfTheDays = await JobOfTheDay.find();
      return jobOfTheDays;
    } catch (error) {
      throw error;
    }
  }

  // Get by id
  static async getById(id: string): Promise<IJOTDDoc | null> {
    try {
      const jobOfTheDay = await JobOfTheDay.findById(id);
      return jobOfTheDay;
    } catch (error) {
      throw error;
    }
  }
}
