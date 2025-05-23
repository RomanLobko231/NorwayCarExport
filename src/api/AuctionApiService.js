import api from "./api";

export default class AuctionApiService {
  static async getAuctionById(id) {
    try {
      const response = await api.get(`/api/v1/auctions/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAuctionByCarId(carId) {
    try {
      const response = await api.get(`/api/v1/auctions/by-car/${carId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAllAuctionsByStatus(status) {
    try {
      const response = await api.get(`/api/v1/auctions?status=${status}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
