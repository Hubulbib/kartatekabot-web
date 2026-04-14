import type { ReviewCriteriaOrder } from "../entities/types";
import $api from "../http/http";

/**
 * Сервис API для публичных операций с заведениями:
 * каталог, рейтинги, карточка кафе, отзывы, расписание и контакты.
 */
export class CafeService {
  /** Получение детальной карточки заведения. */
  static async getCafe(cafeId: number) {
    return await $api.get(`/cafe/${cafeId}`);
  }

  /** Получение каталога заведений по выбранному городу. */
  static async getCatalog(city: string) {
    return await $api.get(`/cafe/catalog?city=${city}`);
  }

  /** Общий рейтинг заведений в городе. */
  static async getRating(city: string) {
    return await $api.get(`/cafe/rating?city=${city}`);
  }

  /** Персональный рейтинг с учетом весов критериев пользователя. */
  static async getPersonalRating(city: string) {
    return await $api.get(`/cafe/rating/personal?city=${city}`);
  }

  static async getCafeReviewList(cafeId: number) {
    return await $api.get(`/cafe/${cafeId}/review`);
  }

  static async getCafeSchedule(cafeId: number) {
    return await $api.get(`/cafe/${cafeId}/schedules`);
  }

  static async getCafeSocialNetworks(cafeId: number) {
    return await $api.get(`/cafe/${cafeId}/social-networks`);
  }

  /** Создание нового пользовательского отзыва. */
  static async createCafeReview(
    cafeId: number,
    data: { criteria: ReviewCriteriaOrder; text: string }
  ) {
    return await $api.post(`/cafe/${cafeId}/review`, data);
  }

  static async editCafeReview(
    reviewId: number,
    data: { criteria?: ReviewCriteriaOrder; text?: string }
  ) {
    return await $api.post(`/cafe//review/${reviewId}`, data);
  }
}
