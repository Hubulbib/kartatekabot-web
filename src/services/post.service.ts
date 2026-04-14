import type { Post } from "../entities/types";
import $api from "../http/http";

/**
 * Сервис API для работы с публикациями в клиентском приложении.
 */
export class PostService {
  static async getPostList(cafeId: number) {
    return await $api.get(`/cafe/${cafeId}/posts`);
  }

  static async createPost(
    cafeId: number,
    body: Omit<Post, "id" | "createdAt" | "updatedAt" | "cafeId" | "media">,
    files: File[]
  ) {
    // Используем multipart/form-data для передачи текста и файлов.
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
    return await $api.post(`/cafe/${cafeId}/posts`, formData);
  }

  static async getPost(cafeId: number, postId: number) {
    return $api.get(`/cafe/${cafeId}/posts/${postId}`);
  }

  static async editPost(
    cafeId: number,
    postId: number,
    body: Omit<Post, "id" | "createdAt" | "updatedAt" | "cafeId" | "media">,
    files: File[]
  ) {
    // Формирование тела запроса аналогично созданию поста.
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
    return await $api.put(`/cafe/${cafeId}/posts/${postId}`, formData);
  }

  static async deletePost(cafeId: number, postId: number) {
    return $api.delete(`/cafe/${cafeId}/posts/${postId}`);
  }
}
