import { AxiosError } from "axios";

interface ServerErrorResponse {
  success: boolean;
  error?: {
    code: string;
    message: string;
    details?: string;
    timestamp: string;
  };
  message?: string;
}

export const handleError = (error: any): string => {
  if (error?.response?.data) {
    const errorData = error.response.data as ServerErrorResponse;

    // Nếu server trả về format { success: false, error: {...} }
    if (errorData.error && errorData.error.message) {
      return errorData.error.message;
    }

    // Nếu server trả về format { message: "..." }
    if (errorData.message) {
      return errorData.message;
    }
  }

  return (error as AxiosError)?.message ?? "Đã có lỗi xảy ra";
};
