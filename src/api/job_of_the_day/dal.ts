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

  // Update detail of job of the day
  static async updateInfo(
    id: string,
    data: JOTDRequests.IUpdateInput
  ): Promise<IJOTDDoc | null> {
    try {
      const jobOfTheDay = await JobOfTheDay.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });
      return jobOfTheDay;
    } catch (error) {
      throw error;
    }
  }

  // Delete all job_of_the_days
  static async deleteAll() {
    try {
      await JobOfTheDay.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  // Delete by id
  static async deleteById(id: string): Promise<IJOTDDoc | null> {
    try {
      const jobOfTheDay = await JobOfTheDay.findByIdAndDelete(id);
      return jobOfTheDay;
    } catch (error) {
      throw error;
    }
  }
}
