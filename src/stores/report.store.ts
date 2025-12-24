import { makeAutoObservable } from "mobx";
import type { Report, ReportType } from "../entities/types";
import { ReportService } from "../services/report.service";

export class ReportStore {
  reports: Report[] = [];

  constructor() {
    makeAutoObservable(this, {}, { deep: true });
  }

  setReports = (reports: Report[]) => {
    this.reports = reports;
  };

  createReport = async (text: string, type: ReportType) => {
    try {
      await ReportService.createReport(text, type);
    } catch (err) {
      throw err;
    }
  };
}
