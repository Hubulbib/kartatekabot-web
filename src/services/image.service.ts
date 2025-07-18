import $api from "../http/http";

export class ImageService {
  static async getImageUrl(fileId: string) {
    const response = await $api.get(`/image/${fileId}`);
    return response.data.url || null;
  }
}
