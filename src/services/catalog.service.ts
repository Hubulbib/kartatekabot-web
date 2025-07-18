import $api from "../http/http";

export class CatalogService {
  static async getCatalog() {
    return await $api.get("/catalog");
  }
}
