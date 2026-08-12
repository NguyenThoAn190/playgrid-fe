import axios, { AxiosInstance, AxiosError } from "axios";

interface ErrorResponseData {
  message?: string;
  error?: string;
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const applyResponseInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ErrorResponseData>) => {
      const originalRequest = error.config as any;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // Chỉ intercept 401 khi ở client-side và không phải các API Auth cơ bản
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry &&
        typeof window !== "undefined" &&
        !originalRequest.url.includes("/api/auth/refresh-token") &&
        !originalRequest.url.includes("/api/auth/login")
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return apiClient(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Gọi API Route refresh-token của Next.js để làm mới cookie HttpOnly
          const response = await axios.post("/api/auth/refresh-token");
          
          if (response.data && response.data.status) {
            isRefreshing = false;
            processQueue(null, response.data.accessToken);
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError, null);
          
          // Chuyển hướng người dùng về trang login nếu refresh token hết hạn
          if (typeof window !== "undefined") {
            const currentLang = window.location.pathname.split("/")[1] || "vi";
            window.location.href = `/${currentLang}/auth/login`;
          }
          return Promise.reject(refreshError);
        }
      }

      if (error.response) {
        const { status, data } = error.response;
        const errorMessage = data?.message ?? data?.error ?? "Unknown error occurred";
        console.error(`HTTP Error: ${status} - ${errorMessage}`);
        const errorMessages: Record<number, string> = {
          408: "Request Timeout - The server took too long to respond.",
          500: "Internal Server Error - Please try again later or contact support.",
          503: "Service Unavailable - The server is currently unable to handle the request.",
        };

        const customMessage = errorMessages[status];
        if (customMessage) {
          error.message = customMessage;
        }
      }

      return Promise.reject(error);
    }
  );
};

export default applyResponseInterceptor;
