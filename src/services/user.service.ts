import type { Criteria } from "../entities/types";
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
}
