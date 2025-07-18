import { makeAutoObservable } from "mobx";
import type { Product } from "../entities/types";
import { ProductService } from "../services/product.service";
import { ImageService } from "../services/image.service";

export class ProductStore {
  product: Product | null = null;

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setProduct(product: Product) {
    this.product = product;
  }

  getProduct = async (productId: number) => {
    try {
      const product: Product = (await ProductService.getProduct(productId)).data
        .data;
      product.imageUrl = await ImageService.getImageUrl(product.imageUrl);
      this.setProduct(product);
    } catch (err) {
      throw err;
    }
  };
}
