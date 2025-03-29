import api from "./api";

export default class ApiService {
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

      const response = await api.post("/api/v1/cars/customer", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async registerSeller(sellerData) {
    try {
      const response = await api.post(
        "/api/v1/users/register_seller",
        sellerData,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async registerOneTimeSeller(sellerData) {
    try {
      const response = await api.post(
        "/api/v1/users/register_one_time_seller",
        sellerData,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async registerBuyer(buyerData, licences) {
    try {
      const data = new FormData();
      const requestBlob = new Blob([JSON.stringify(buyerData)], {
        type: "application/json",
      });
      data.append("buyerData", requestBlob);

      licences.forEach((licence) => {
        data.append("organisationLicences", licence);
      });

      const response = api.post("api/v1/users/register_buyer", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async loginUser(loginData) {
    try {
      const response = await api.post("/api/v1/users/login", loginData);
      localStorage.setItem("token", response.data.token);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const response = await api.get(`/api/v1/users/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
