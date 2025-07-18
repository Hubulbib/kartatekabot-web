import { retrieveRawLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

const $api = axios.create({
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  const initData = retrieveRawLaunchParams();

  if (initData) {
    // Извлекаем только данные инициализации из tgWebAppData
    const initDataString = initData
      .split("&")
      .find((param) => param.startsWith("tgWebAppData="))
      ?.split("=")[1];

    if (initDataString) {
      config.headers["X-Telegram-Init-Data"] = initDataString;
    }
  }
  return config;
});

export default $api;
