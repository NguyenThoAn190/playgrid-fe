import { AxiosInstance } from "axios";
import { getLocale } from "../../utils/lang";
import { CookiesContains } from "../../constants/cookies";

interface RequestContext {
  isServer?: boolean;
  token?: string;
  locale?: string;
}

const getClientCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const cookieItem = ca[i];
    if (!cookieItem) continue;
    let c = cookieItem.trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
};

const applyRequestInterceptor = (
  apiClient: AxiosInstance,
  context?: RequestContext
) => {
  apiClient.interceptors.request.use(
    async (config) => {
      let token: string | null = null;
      let currentLocale: string | null = null;

      if (context?.isServer && context.token) {
        token = context.token;
        currentLocale = context.locale || null;
      } else {
        token = getClientCookie(CookiesContains.TOKEN);
        currentLocale = await getLocale();
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (currentLocale) {
        config.headers["lang"] = currentLocale;
        config.headers["Accept-Language"] = currentLocale;
        config.params = { ...(config.params || {}), lang: currentLocale };
      }

      return config;
    },
    (error) => {
      if (error instanceof Error) {
        return Promise.reject(error);
      }
      return Promise.reject(
        new Error(typeof error === "string" ? error : JSON.stringify(error))
      );
    }
  );
};

export default applyRequestInterceptor;
