import { makeAutoObservable } from "mobx";
import type {
  Cafe,
  CafeSchedule,
  Review,
  ReviewCriteriaOrder,
  SocialNetwork,
} from "../entities/types";
import { CafeService } from "../services/cafe.service";

/**
 * Хранилище данных витрины заведений:
 * каталог, карточка кафе, расписание, контакты и отзывы.
 */
export class CafeStore {
  catalog: Cafe[] = [];
  cafe: Cafe | null = null;
  cafeSchedule: CafeSchedule | null = null;
  cafeSocialNetworks: SocialNetwork[] = [];
  cafeReviews: Review[] = [];

  isCafeLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  /** Обновляет список кафе для текущего города. */
  setCatalog(catalog: Cafe[]) {
    this.catalog = catalog;
  }

  setCafe(cafe: Cafe) {
    this.cafe = cafe;
  }

  setCafeSchedule(schedule: CafeSchedule) {
    this.cafeSchedule = schedule;
  }

  setCafeSocialNetworks(socialNetworks: SocialNetwork[]) {
    this.cafeSocialNetworks = socialNetworks;
  }

  setCafeReviews(reviews: Review[]) {
    this.cafeReviews = reviews;
  }

  setIsCafeLoading(isLoading: boolean) {
    this.isCafeLoading = isLoading;
  }

  /**
   * Загружает карточку заведения по идентификатору.
   * Используется на странице детального просмотра кафе.
   */
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

  /** Загружает расписание работы заведения. */
  getCafeSchedule = async (cafeId: number) => {
    this.setIsCafeLoading(true);
    try {
      const schedule: CafeSchedule = (await CafeService.getCafeSchedule(cafeId))
        .data.data;
      this.setCafeSchedule(schedule);
    } catch (err) {
      throw err;
    } finally {
      this.setIsCafeLoading(false);
    }
  };

  /** Загружает отзывы конкретного заведения. */
  getCafeReviews = async (cafeId: number) => {
    this.setIsCafeLoading(true);
    try {
      const cafeReviews: Review[] = (
        await CafeService.getCafeReviewList(cafeId)
      ).data.data;
      this.setCafeReviews(cafeReviews);
    } catch (err) {
      throw err;
    } finally {
      this.setIsCafeLoading(false);
    }
  };

  getCafeSocialNetworks = async (cafeId: number) => {
    this.setIsCafeLoading(true);
    try {
      const socialNetworks: SocialNetwork[] = (
        await CafeService.getCafeSocialNetworks(cafeId)
      ).data.data;
      this.setCafeSocialNetworks(socialNetworks);
    } catch (err) {
      throw err;
    } finally {
      this.setIsCafeLoading(false);
    }
  };

  /** Загружает каталог заведений в выбранном городе. */
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

  /**
   * Создает отзыв пользователя и при необходимости обновляет карточку заведения.
   */
  createCafeReviw = async (
    cafeId: number,
    data: { criteria: ReviewCriteriaOrder; text: string }
  ) => {
    try {
      const review: Review = (await CafeService.createCafeReview(cafeId, data))
        ?.data?.data;
      if (review?.cafe) await this.getCafe(review.cafe.id);
    } catch (err) {
      throw err;
    }
  };

  /** Обновляет существующий отзыв пользователя для заведения. */
  editCafeReviw = async (
    reviewId: number,
    data: { criteria: ReviewCriteriaOrder; text: string }
  ) => {
    try {
      const review: Review = (await CafeService.editCafeReview(reviewId, data))
        ?.data?.data;
      if (review?.cafe) this.setCafe(review.cafe);
    } catch (err) {
      throw err;
    }
  };
}
