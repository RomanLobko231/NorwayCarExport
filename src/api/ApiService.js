import api from "./api";

export default class ApiService {
  static async postCarRequest(request) {
    api
      .post("/api/v1/cars", request)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}
