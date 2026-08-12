import { CookiesContains } from "../../constants/cookies";
import Cookies from "js-cookie";

export interface DecodedToken {
  accessToken: string;
  refreshToken: string;
  email: string;
  role: string;
}

const tokenManager = {
  setTokens: (
    accessToken: string,
    refreshToken: string,
    user: { email: string; role: string }
  ) => {
    // Không lưu token & refresh_token vào js-cookie nữa vì chúng đã được quản lý an toàn thông qua HttpOnly Cookies ở phía server

    if (user.email) {
      Cookies.set(CookiesContains.EMAIL, user.email);
    }

    if (user.role) {
      Cookies.set(CookiesContains.ROLE, user.role);

    }
  },

  setAccessToken: (newAccessToken: string) => {
    // access_token đã được lưu tự động bằng HttpOnly Cookie phía server Next.js
  },

  setRefreshToken: (newRefreshToken: string) => {
    // refresh_token đã được lưu tự động bằng HttpOnly Cookie phía server Next.js
  },

  setRole: (newRole: string) => {
    Cookies.set(CookiesContains.ROLE, newRole);
  },

  setEmail: (newEmail: string) => {
    Cookies.set(CookiesContains.EMAIL, newEmail);
  },

  isTokenExpired: (token: string): boolean => {
    if (!token) return true;
    try {
      const parts = token.split(".");
      if (!parts[1]) return true;
      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  },


  getTokenData: (): DecodedToken | null => {
    const email = tokenManager.getEmail() || "";
    const role = tokenManager.getRole() || "";

    return {
      accessToken: "", // HttpOnly không cho phép truy cập từ JS client
      refreshToken: "",
      email,
      role,
    };
  },

  getAccessToken: (): string | null => {
    // HttpOnly Cookie không thể truy cập qua JavaScript client-side
    return null;
  },

  getRefreshToken: (): string | null => {
    // HttpOnly Cookie không thể truy cập qua JavaScript client-side
    return null;
  },

  getEmail: (): string | null => {
    return Cookies.get(CookiesContains.EMAIL) || null;
  },

  getRole: (): string | null => {
    return Cookies.get(CookiesContains.ROLE) || null;
  },

  removeTokens: () => {
    // Xóa email và role ở client-side
    Cookies.remove(CookiesContains.EMAIL);
    Cookies.remove(CookiesContains.ROLE);

  },

  updateAccessToken: (newAccessToken: string) => {
    // Quản lý bởi Server HttpOnly Cookie
  },

  updateRefreshToken: (newRefreshToken: string) => {
    // Quản lý bởi Server HttpOnly Cookie
  },
};

export default tokenManager;
