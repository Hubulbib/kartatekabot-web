import type { Promotion } from "../entities/types";
import $api from "../http/http";

/**
 * Сервис API для работы с акциями заведения.
 */
export class PromotionService {
  static async getPromotionList(cafeId: number) {
    return await $api.get(`/cafe/${cafeId}/promotions`);
  }

  static async createPromotion(
    cafeId: number,
    body: Omit<
      Promotion,
      "id" | "createdAt" | "updatedAt" | "cafeId" | "media" | "dateStart"
    > & { dateStart?: Date },
    files: File[]
  ) {
    // multipart-form обеспечивает передачу метаданных акции и медиа в одном запросе.
    const formData = new FormData();
    for (const key of Object.keys(body) as Array<keyof typeof body>) {
      const value = body[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    }
    for (const file of files) {
      formData.append("files", file);
    }
    return await $api.post(`/cafe/${cafeId}/promotions`, formData);
  }

  static async getPromotion(cafeId: number, promotionId: number) {
    return $api.get(`/cafe/${cafeId}/promotions/${promotionId}`);
  }

  static async editPromotion(
    cafeId: number,
    promotionId: number,
    body: Omit<
      Promotion,
      "id" | "createdAt" | "updatedAt" | "cafeId" | "media" | "dateStart"
    > & { dateStart?: Date },
    files: File[]
  ) {
    // На этапе редактирования используется тот же протокол подготовки FormData.
    const formData = new FormData();
    for (const key of Object.keys(body) as Array<keyof typeof body>) {
      const value = body[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    }
    for (const file of files) {
      formData.append("files", file);
    }
    return await $api.put(
      `/cafe/${cafeId}/promotions/${promotionId}`,
      formData
    );
  }

  static async deletePromotion(cafeId: number, promotionId: number) {
    return $api.delete(`/cafe/${cafeId}/promotions/${promotionId}`);
  }
}
