import api from "./api";

export default class ApiService {
  static async postCarRequest(request, images) {
    try {
      const data = new FormData();
      const requestBlob = new Blob([JSON.stringify(request)], {
        type: "application/json",
      });
      data.append("request", requestBlob);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await api.post("/api/v1/cars/customer", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
