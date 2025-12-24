import $api from "../http/http";

export class CriteriaService {
  static async getCriteriaList() {
    return await $api.get(`/criteria`);
  }
}
