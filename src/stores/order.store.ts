import { makeAutoObservable } from "mobx";
import type { Order } from "../entities/types";
import { OrderService } from "../services/order.service";
import { ImageService } from "../services/image.service";

export class OrderStore {
  orderList: Order[] = [];
  order: Order | null = null;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setOrderList(orderList: Order[]) {
    this.orderList = orderList;
  }

  setOrder(order: Order) {
    this.order = order;
  }

  getOrderList = async () => {
    try {
      const orderList: Order[] = (await OrderService.getAllOrders()).data.data;
      for (const order of orderList) {
        for (const item of order.items) {
          item.product.imageUrl = await ImageService.getImageUrl(
            item.product.imageUrl
          );
        }
      }
      this.setOrderList(orderList);
    } catch (err) {
      throw err;
    }
  };

  getOrder = async (orderId: number) => {
    try {
      const order: Order = (await OrderService.getOrder(orderId)).data.data;
      for (const item of order.items) {
        item.product.imageUrl = await ImageService.getImageUrl(
          item.product.imageUrl
        );
      }
      this.setOrder(order);
    } catch (err) {
      throw err;
    }
  };

  createOrder = async (name: string, phone: string, address: string) => {
    try {
      await OrderService.createOrder(name, phone, address);
    } catch (err) {
      throw err;
    }
  };
}
