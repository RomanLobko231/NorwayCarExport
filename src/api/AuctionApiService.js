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

  static async getAllByCarIdsAndStatus(carIds, status) {
    try {
      const response = await api.get(
        `/api/v1/auctions?status=${status}&ids=${carIds}`,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async placeBid(bid) {
    try {
      const response = await api.post(`/api/v1/auctions/place-bid`, bid);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async placeAutoBid(autoBid) {
    try {
      const response = await api.post(
        `/api/v1/auctions/place-auto-bid`,
        autoBid,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
