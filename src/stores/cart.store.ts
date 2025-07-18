import { makeAutoObservable } from "mobx";
import type { CartItem } from "../entities/types";
import { CartService } from "../services/cart.service";
import { ImageService } from "../services/image.service";

export class CartStore {
  cartList: CartItem[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setCartList(cartList: CartItem[]) {
    this.cartList = cartList;
  }

  getCartItems = async () => {
    try {
      const items: CartItem[] = (await CartService.getCart()).data.data;
      for (const item of items) {
        item.product.imageUrl = await ImageService.getImageUrl(
          item.product.imageUrl
        );
      }
      this.setCartList(items);
    } catch (err) {
      throw err;
    }
  };

  addProductToCart = async (productId: number) => {
    try {
      await CartService.addToCart(productId);
      await this.getCartItems();
    } catch (err) {
      throw err;
    }
  };

  deleteFromCart = async (productId: number) => {
    try {
      await CartService.deletFromCart(productId);
      await this.getCartItems();
    } catch (err) {
      throw err;
    }
  };

  editQuantityInCart = async (productId: number, quantity: number) => {
    try {
      await CartService.editQuantityInCart(productId, quantity);
      await this.getCartItems();
    } catch (err) {
      throw err;
    }
  };
}
