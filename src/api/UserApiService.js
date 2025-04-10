import api from "./api";

export default class UserApiService {
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
      localStorage.setItem("userId", response.data.userId);
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

  static async updateUser(userData) {
    try {
      const response = await api.put(`/api/v1/users/${userData.id}`, userData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
