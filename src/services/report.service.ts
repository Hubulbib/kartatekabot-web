import type { ReportType } from "../entities/types";
import $api from "../http/http";

export class ReportService {
  static async createReport(text: string, type: ReportType) {
    return await $api.post("/", { text, type });
  }
}
