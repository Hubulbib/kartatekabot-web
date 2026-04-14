import type { BusinessRequest, Criteria } from "../entities/types";
import $api from "../http/http";

/**
 * Сервис API-запросов, связанных с профилем пользователя.
 * Инкапсулирует HTTP-методы клиентского приложения tgbot-web.
 */
export class UserService {
  /** Получение профиля текущего авторизованного пользователя. */
  static async getUserData() {
    return await $api.get(`/users/my`);
  }

  /** Обновление пользовательских весов критериев для персонального рейтинга. */
  static async editUserCriteria(criteria: Criteria) {
    return await $api.patch("/users/criteria", criteria);
  }

  /** Обновление выбранного города пользователя. */
  static async editUserCity(city: string) {
    return await $api.patch("/users/city", { city });
  }

  static async getUserReviews() {
    return await $api.get("/users/reviews");
  }

  /** Получение заявок на подтверждение владения заведением. */
  static async getBusinessRequests() {
    return await $api.get("/business");
  }

  static async createBusinessRequest(
    body: Pick<BusinessRequest, "cafeName" | "cafeUsername" | "socialNetwork">
  ) {
    return await $api.post("/business/request", body);
  }
}
