import { makeAutoObservable } from "mobx";
import type { Cafe } from "../entities/types";
import { CafeService } from "../services/cafe.service";

export class RatingeStore {
  rating: (Cafe & { score: number })[] = [];
  personalRating: (Cafe & { score: number })[] = [];

  isRatingLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setRating(rating: (Cafe & { score: number })[]) {
    this.rating = rating;
  }

  setPersonalRating(rating: (Cafe & { score: number })[]) {
    this.personalRating = rating;
  }

  setIsRatingLoading(isLoading: boolean) {
    this.isRatingLoading = isLoading;
  }

  getRating = async (city: string) => {
    this.setIsRatingLoading(true);
    try {
      const rating: (Cafe & { score: number })[] = (
        await CafeService.getRating(city)
      ).data.data;
      this.setRating(rating);
    } catch (err) {
      throw err;
    } finally {
      this.setIsRatingLoading(false);
    }
  };

  getPersonalRating = async (city: string) => {
    this.setIsRatingLoading(true);
    try {
      const rating: (Cafe & { score: number })[] = (
        await CafeService.getPersonalRating(city)
      ).data.data;
      this.setPersonalRating(rating);
    } catch (err) {
      throw err;
    } finally {
      this.setIsRatingLoading(false);
    }
  };
}
