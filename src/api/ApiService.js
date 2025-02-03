import api from "./api";

export default class ApiService {
  static async postCarRequest(request) {
    try {
      await api.post("/api/v1/cars/customer", request);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
