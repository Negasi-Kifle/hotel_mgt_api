import Linens from "./model";
import ILinenTypesDoc from "./dto";

// Data access layer for linens data
export default class LinenDAL {
  // Create linen
  static async createLinen(
    data: LinenTypeRequests.ICreateInput
  ): Promise<ILinenTypesDoc> {
    try {
      const linen = await Linens.create(data);
      return linen;
    } catch (error) {
      throw error;
    }
  }

  // Find linen by slug
  static async getBySlug(linen_slug: string): Promise<ILinenTypesDoc | null> {
    try {
      const linen = await Linens.findOne({ linen_slug });
      return linen;
    } catch (error) {
      throw error;
    }
  }

  // Get all linens
  static async getAllLinens(): Promise<ILinenTypesDoc[]> {
    try {
      const linens = await Linens.find();
      return linens;
    } catch (error) {
      throw error;
    }
  }

  // Delete all linen_types
  static async deleteAll() {
    try {
      await Linens.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  // Delete by id
  static async deleteById(id: string): Promise<ILinenTypesDoc | null> {
    try {
      const linenType = await Linens.findByIdAndDelete(id);
      return linenType;
    } catch (error) {
      throw error;
    }
  }

  // Get linen type by id
  static async getById(id: string): Promise<ILinenTypesDoc | null> {
    try {
      const linenType = await Linens.findById(id);
      return linenType;
    } catch (error) {
      throw error;
    }
  }
}
