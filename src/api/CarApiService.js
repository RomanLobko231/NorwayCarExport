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

  static async existsByRegNumber(regNumber) {
    try {
      const response = await api.get(
        `/api/v1/cars/exists?regNumber=${regNumber}`,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async saveCarComplete(car, images) {
    try {
      const data = new FormData();
      const carDataBlob = new Blob([JSON.stringify(car)], {
        type: "application/json",
      });
      data.append("carData", carDataBlob);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await api.post("/api/v1/cars/add_complete_user", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteCarById(id) {
    try {
      const response = await api.delete(`/api/v1/cars/${id}`);
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

  static async getCarById(id) {
    try {
      const response = await api.get(`/api/v1/cars/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateCar(car, images) {
    try {
      const data = new FormData();
      const carDataBlob = new Blob([JSON.stringify(car)], {
        type: "application/json",
      });
      data.append("carData", carDataBlob);

      images.forEach((image) => {
        data.append("images", image);
      });

      const response = await api.put("/api/v1/cars", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
