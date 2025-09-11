import type { Criteria } from "../entities/types";
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

  static async createCafeReview(
    cafeId: number,
    data: { criteria: Criteria; text: string }
  ) {
    return await $api.post(`/cafe/${cafeId}/review`, data);
  }

  static async editCafeReview(
    reviewId: number,
    data: { criteria?: Criteria; text?: string }
  ) {
    return await $api.post(`/cafe//review/${reviewId}`, data);
  }
}
