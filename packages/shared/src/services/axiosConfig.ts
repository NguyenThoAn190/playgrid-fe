import axios, { AxiosInstance } from "axios";
import applyRequestInterceptor from "./interceptors/request.interceptor";
import applyResponseInterceptor from "./interceptors/response.interceptor";

const createApiClient = (
  context?: { isServer?: boolean; token?: string; locale?: string }
): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });
  applyRequestInterceptor(apiClient, context);
  applyResponseInterceptor(apiClient);
  return apiClient;
};

const apiClient = createApiClient();

export const serverApiClient = (
  token: string,
  locale?: string
): AxiosInstance => {
  return createApiClient({ isServer: true, token, locale });
};

export default apiClient;
