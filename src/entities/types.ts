export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  subscriptionPrice: number;
  imageUrl: string;
  available: boolean;
  category: Category;
};

export type Category = {
  id: number;
  name: string;
  products: Product[];
};

export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export enum OrderStatus {
  PROCESSING = "Обработка",
  ACCEPTED = "Принят",
  ASSEMBLING = "Сборка",
  TRANSFERRED_TO_COURIER = "Передан курьеру",
  IN_TRANSIT = "В пути",
  DELIVERED = "Доставлен",
  CANCELED = "Отменен",
}

export enum PayType {
  CASH = "Наличные",
  ONLINE = "Онлайн",
}

export type Order = {
  id: number;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: string;
  residentialComplex: string;
  customerPhone: string;
  customerName: string;
  paymentId: string;
  payType: PayType;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  id: number;
  quantity: number;
  price: number;
  order: Order;
  product: Product;
};
