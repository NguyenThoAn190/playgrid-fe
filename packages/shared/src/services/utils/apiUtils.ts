import apiClient from "../axiosConfig";
import { Stage } from "../types/stage.type";
import { createResponse } from "./createResponse";
import { handleError } from "./errorUtils";
import { AxiosResponse } from "axios";

export interface RequestOptions {
  token?: string;
  locale?: string;
}

export const getRequest = async <T>(
  url: string,
  params?: Record<string, any>,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {};
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<any> = await apiClient.get(url, {
      params,
      ...(Object.keys(headers).length > 0 ? { headers } : {}),
    });
    const serverResponse = response.data;

    if (serverResponse.success !== undefined) {
      if (serverResponse.success) {
        return createResponse(serverResponse, true);
      } else {
        const errorMessage =
          serverResponse.error?.message || "Đã có lỗi xảy ra";
        return createResponse(null, false, errorMessage);
      }
    }

    return createResponse(serverResponse, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const postRequest = async <T>(
  url: string,
  data?: any,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {};
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<any> = await apiClient.post(url, data, {
      ...(Object.keys(headers).length > 0 ? { headers } : {}),
    });
    const serverResponse = response.data;

    if (serverResponse.success !== undefined) {
      if (serverResponse.success) {
        return createResponse(serverResponse, true);
      } else {
        const errorMessage =
          serverResponse.error?.message || "Đã có lỗi xảy ra";
        return createResponse(null, false, errorMessage);
      }
    }

    return createResponse(serverResponse, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const putRequest = async <T>(
  url: string,
  data?: any,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {};
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<any> = await apiClient.put(url, data, {
      ...(Object.keys(headers).length > 0 ? { headers } : {}),
    });
    const serverResponse = response.data;

    if (serverResponse.success !== undefined) {
      if (serverResponse.success) {
        return createResponse(serverResponse, true);
      } else {
        const errorMessage =
          serverResponse.error?.message || "Đã có lỗi xảy ra";
        return createResponse(null, false, errorMessage);
      }
    }

    return createResponse(serverResponse, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const patchRequest = async <T>(
  url: string,
  data?: any,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {};
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<any> = await apiClient.patch(url, data, {
      ...(Object.keys(headers).length > 0 ? { headers } : {}),
    });
    const serverResponse = response.data;

    if (serverResponse.success !== undefined) {
      if (serverResponse.success) {
        return createResponse(serverResponse, true);
      } else {
        const errorMessage =
          serverResponse.error?.message || "Đã có lỗi xảy ra";
        return createResponse(null, false, errorMessage);
      }
    }

    return createResponse(serverResponse, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const deleteRequest = async <T>(
  url: string,
  params?: Record<string, any>,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {};
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<any> = await apiClient.delete(url, {
      params,
      ...(Object.keys(headers).length > 0 ? { headers } : {}),
    });
    const serverResponse = response.data;

    if (serverResponse.success !== undefined) {
      if (serverResponse.success) {
        return createResponse(serverResponse, true);
      } else {
        const errorMessage =
          serverResponse.error?.message || "Đã có lỗi xảy ra";
        return createResponse(null, false, errorMessage);
      }
    }

    return createResponse(serverResponse, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const postFormData = async <T>(
  url: string,
  formData: FormData,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "multipart/form-data",
    };
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<T> = await apiClient.post(url, formData, {
      headers,
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const putFormData = async <T>(
  url: string,
  formData: FormData,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "multipart/form-data",
    };
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<T> = await apiClient.put(url, formData, {
      headers,
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const patchFormData = async <T>(
  url: string,
  formData: FormData,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "multipart/form-data",
    };
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<T> = await apiClient.patch(url, formData, {
      headers,
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const postList = async <T>(
  url: string,
  dataList: any[],
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {};
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }

    const response: AxiosResponse<T> = await apiClient.post(url, dataList, {
      ...(Object.keys(headers).length > 0 ? { headers } : {}),
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};

export const request = async <T>(
  url: string,
  options?: RequestOptions
): Promise<Stage<T | null>> => {
  try {
    const headers: Record<string, string> = {};
    if (options?.token) {
      headers["Authorization"] = `Bearer ${options.token}`;
    }
    if (options?.locale) {
      headers["lang"] = options.locale;
      headers["Accept-Language"] = options.locale;
    }

    const response: AxiosResponse<T> = await apiClient.get(url, {
      ...(Object.keys(headers).length > 0 ? { headers } : {}),
    });
    return createResponse(response.data, true);
  } catch (error) {
    return createResponse(null, false, handleError(error));
  }
};
