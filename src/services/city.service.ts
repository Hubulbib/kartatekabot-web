import $api from "../http/http";

export class CityService {
  static async getCityList() {
    return await $api.get(`/cities`);
  }
}
