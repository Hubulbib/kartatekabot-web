import $api from "../http/http";

export class ProductService {
  static async getProduct(productId: number) {
    return await $api.get(`/product/${productId}`);
  }
}
