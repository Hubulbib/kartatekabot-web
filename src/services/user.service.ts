import $api from "../http/http";

export class UserService {
  static async getSubscriptionStatus() {
    return await $api.get(`/subscription/check`);
  }
}
