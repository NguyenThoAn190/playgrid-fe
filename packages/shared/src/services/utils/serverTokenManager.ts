import { NextRequest } from "next/server";
import { cookies } from "next/headers";

interface ServerTokenManager {
  getTokenFromRequest: (request: NextRequest) => string | null;
  getTokenFromCookies: () => Promise<string | null>;
}

export const serverTokenManager: ServerTokenManager = {
  // Lấy token từ request (cho API routes)
  getTokenFromRequest: (request: NextRequest) => {
    // Thử lấy từ Authorization header trước
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      return authHeader.replace("Bearer ", "");
    }

    // Thử lấy từ cookies
    const token = request.cookies.get("accessToken")?.value;
    return token || null;
  },

  // Lấy token từ cookies (cho Server Components)
  getTokenFromCookies: async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    return token || null;
  },
};

// Helper function để tạo authenticated fetch request
export const createAuthenticatedFetch = async (
  url: string,
  options: RequestInit = {},
  token?: string | null
) => {
  // Nếu không có token, thử lấy từ cookies
  if (!token) {
    token = await serverTokenManager.getTokenFromCookies();
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
