import api from "./api";

export default class UserApiService {
  static async registerSeller(sellerData) {
    try {
      const response = await api.post(
        "/api/v1/users/register-seller",
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
        "/api/v1/users/register-one-time-seller",
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

      const response = api.post("api/v1/users/register-buyer", data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async registerBuyerRepresentative(representativeData) {
    try {
      const response = api.post(
        "api/v1/users/register-representative",
        representativeData,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async loginUser(loginData) {
    try {
      const response = await api.post("/api/v1/users/login", loginData);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userId", response.data.userId);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const response = await api.get(`/api/v1/users/${id}`);
      sessionStorage.setItem("isAccountLocked", response.data.accountLocked);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateUser(userData) {
    try {
      const response = await api.put(`/api/v1/users`, userData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteUserById(id) {
    try {
      const response = await api.delete(`/api/v1/users/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getRepresentativesByBuyerId(id) {
    try {
      const response = await api.get(
        `/api/v1/users/buyers/${id}/representatives`,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
