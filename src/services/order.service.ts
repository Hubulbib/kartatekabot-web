import $api from "../http/http";

export class OrderService {
  static async getAllOrders() {
    return await $api.get("/order");
  }
  static async getOrder(orderId: number) {
    return await $api.get(`/order/${orderId}`);
  }
  static async createOrder(name: string, phone: string, address: string) {
    return await $api.post("/order", { name, phone, address });
  }
}
