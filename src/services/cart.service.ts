import $api from "../http/http";

export class CartService {
  static async getCart() {
    return await $api.get("/cart");
  }
  static async addToCart(productId: number) {
    return await $api.post(`/cart/product/${productId}`);
  }
  static async deletFromCart(productId: number) {
    return await $api.delete(`/cart/product/${productId}`);
  }
  static async editQuantityInCart(productId: number, quantity: number) {
    return await $api.patch(`/cart/product/${productId}`, { quantity });
  }
}
