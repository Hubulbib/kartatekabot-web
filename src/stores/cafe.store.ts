import { makeAutoObservable } from "mobx";
import type { Cafe, Criteria, Review } from "../entities/types";
import { CafeService } from "../services/cafe.service";

export class CafeStore {
  catalog: Cafe[] = [];
  cafe: Cafe | null = null;

  isCafeLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setCatalog(catalog: Cafe[]) {
    this.catalog = catalog;
  }

  setCafe(cafe: Cafe) {
    this.cafe = cafe;
  }

  setIsCafeLoading(isLoading: boolean) {
    this.isCafeLoading = isLoading;
  }

  getCafe = async (cafeId: number) => {
    this.setIsCafeLoading(true);
    try {
      const cafe: Cafe = (await CafeService.getCafe(cafeId)).data.data;
      this.setCafe(cafe);
    } catch (err) {
      throw err;
    } finally {
      this.setIsCafeLoading(false);
    }
  };

  getCatalog = async (city: string) => {
    this.setIsCafeLoading(true);
    try {
      const catalog: Cafe[] = (await CafeService.getCatalog(city)).data.data;
      this.setCatalog(catalog);
    } catch (err) {
      throw err;
    } finally {
      this.setIsCafeLoading(false);
    }
  };

  createCafeReviw = async (
    cafeId: number,
    data: { criteria: Criteria; text: string }
  ) => {
    try {
      const review: Review = (await CafeService.createCafeReview(cafeId, data))
        ?.data?.data;
      await this.getCafe(review.cafe.id);
    } catch (err) {
      throw err;
    }
  };

  editCafeReviw = async (
    reviewId: number,
    data: { criteria: Criteria; text: string }
  ) => {
    try {
      const review: Review = (await CafeService.editCafeReview(reviewId, data))
        ?.data?.data;
      this.setCafe(review.cafe);
    } catch (err) {
      throw err;
    }
  };
}
