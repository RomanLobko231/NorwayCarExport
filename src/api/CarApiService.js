import api from "./api";

export default class CarApiService {
  static async postCarData(carData, images) {
    try {
      const data = new FormData();
      const requestBlob = new Blob([JSON.stringify(carData)], {
        type: "application/json",
      });
      data.append("carData", requestBlob);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await api.post("/api/v1/cars/add_simplified", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getCarsByOwnerId(id) {
    try {
      const response = await api.get(`/api/v1/cars/by_owner/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
