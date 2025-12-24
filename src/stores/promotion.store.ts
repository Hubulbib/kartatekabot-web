import { makeAutoObservable } from "mobx";
import type { Promotion } from "../entities/types";
import { PromotionService } from "../services/promotion.service";

export class PromotionStore {
  promotionList: Promotion[] = [];
  promotion: Promotion | null = null;
  isPromotionLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setPromotionList = (promotionList: Promotion[]) => {
    this.promotionList = promotionList;
  };

  setPromotion = (promotion: Promotion) => {
    this.promotion = promotion;
  };

  setIsPromotionLoading = (loading: boolean) => {
    this.isPromotionLoading = loading;
  };

  getPromotionList = async (cafeId: number) => {
    this.setIsPromotionLoading(true);
    try {
      const promotionList = (await PromotionService.getPromotionList(cafeId))
        .data.data;
      this.setPromotionList(promotionList);
    } catch (err) {
      throw err;
    } finally {
      this.setIsPromotionLoading(false);
    }
  };

  getPromotion = async (cafeId: number, promotionId: number) => {
    this.setIsPromotionLoading(true);
    try {
      const promotion = (
        await PromotionService.getPromotion(cafeId, promotionId)
      ).data.data;
      this.setPromotion(promotion);
    } catch (err) {
      throw err;
    } finally {
      this.setIsPromotionLoading(false);
    }
  };

  createPromotion = async (
    cafeId: number,
    body: Omit<
      Promotion,
      "id" | "createdAt" | "updatedAt" | "cafeId" | "media" | "dateStart"
    > & { dateStart?: Date },
    files: File[]
  ) => {
    this.setIsPromotionLoading(true);
    try {
      const promotion = (
        await PromotionService.createPromotion(cafeId, body, files)
      ).data.data;
      this.setPromotionList([promotion, ...this.promotionList]);
    } catch (err) {
      throw err;
    } finally {
      this.setIsPromotionLoading(false);
    }
  };

  editPromotion = async (
    cafeId: number,
    promotionId: number,
    body: Omit<
      Promotion,
      "id" | "createdAt" | "updatedAt" | "cafeId" | "media" | "dateStart"
    > & { dateStart?: Date },
    files: File[]
  ) => {
    this.setIsPromotionLoading(true);
    try {
      const promotion = (
        await PromotionService.editPromotion(cafeId, promotionId, body, files)
      ).data.data;
      this.setPromotion(promotion);
    } catch (err) {
      throw err;
    } finally {
      this.setIsPromotionLoading(false);
    }
  };

  deletePromotion = async (cafeId: number, promotionId: number) => {
    this.setIsPromotionLoading(true);
    try {
      await PromotionService.deletePromotion(cafeId, promotionId);
      this.setPromotionList(
        this.promotionList.filter((el) => el.id !== promotionId)
      );
    } catch (err) {
      throw err;
    } finally {
      this.setIsPromotionLoading(false);
    }
  };
}
