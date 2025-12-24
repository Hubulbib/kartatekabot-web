import type { ReviewCriteriaOrder } from "../entities/types";
import $api from "../http/http";

export class CafeService {
  static async getCafe(cafeId: number) {
    return await $api.get(`/cafe/${cafeId}`);
  }

  static async getCatalog(city: string) {
    return await $api.get(`/cafe/catalog?city=${city}`);
  }

  static async getRating(city: string) {
    return await $api.get(`/cafe/rating?city=${city}`);
  }

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
