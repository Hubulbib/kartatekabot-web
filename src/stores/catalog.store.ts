import { makeAutoObservable } from "mobx";
import type { Product } from "../entities/types";
import { CatalogService } from "../services/catalog.service";
import { ImageService } from "../services/image.service";

export class CatalogStore {
  items: Record<string, Product[]> = {};

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setItems(items: Record<string, Product[]>) {
    this.items = items;
  }

  getCatalogItems = async () => {
    try {
      const items: Record<string, Product[]> =
        (await CatalogService.getCatalog()).data?.data || {};
      for (const key in items) {
        for (const product of items[key]) {
          product.imageUrl = await ImageService.getImageUrl(product.imageUrl);
        }
      }
      this.setItems(items);
    } catch (err) {
      console.log(err);
    }
  };
}
