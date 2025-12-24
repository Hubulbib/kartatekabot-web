import type { BusinessRequest, Criteria } from "../entities/types";
import $api from "../http/http";

export class UserService {
  static async getUserData() {
    return await $api.get(`/users/my`);
  }

  static async editUserCriteria(criteria: Criteria) {
    return await $api.patch("/users/criteria", criteria);
  }

  static async editUserCity(city: string) {
    return await $api.patch("/users/city", { city });
  }

  static async getUserReviews() {
    return await $api.get("/users/reviews");
  }

  static async getBusinessRequests() {
    return await $api.get("/business");
  }

  static async createBusinessRequest(
    body: Pick<BusinessRequest, "cafeName" | "cafeUsername" | "socialNetwork">
  ) {
    return await $api.post("/business/request", body);
  }
}
