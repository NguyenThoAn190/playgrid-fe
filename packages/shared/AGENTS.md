# PLAYGRID SHARED LIBRARY — AGENT & DEVELOPER BIBLE (`packages/shared`)

> **Package:** `@workspace/shared`  
> **Đường dẫn:** `packages/shared`  
> **Vai trò:** Thư viện chứa logic nghiệp vụ dùng chung, HTTP API Client, SSO Auth Helpers, Anti-Bot Middleware, Constants và Custom Hooks cho toàn bộ hệ thống PlayGrid.

---

## 1. TỔNG QUAN PACKAGE `@workspace/shared`

`packages/shared` là xương sống logic của PlayGrid Frontend. Thư viện này chứa toàn bộ các hàm gọi API tập trung, cơ chế refresh token tự động, tích hợp SSR context token, bộ lọc bot độc hại, hằng số cấu hình hệ thống và các tiện ích quản lý phiên SSO đa ứng dụng.

### 1.1. Cấu Trúc Thư Mục
```
packages/shared/
├── src/
│   ├── services/             # HTTP Client & API Handlers
│   │   ├── axiosConfig.ts    # Client & Server Axios instances (with SSR Token)
│   │   ├── interceptors/     # Request token injection & response refresh token
│   │   └── handler/          # Domain handlers (auth, venue, tournament)
│   ├── utils/                # SSO helpers, image resize, language utils
│   │   ├── sso.ts            # getLoginUrl, getRegisterUrl, clearAuthCookies
│   │   ├── imageResize.ts    # Client-side image compressor before upload
│   │   └── lang.ts           # Dynamic localized text resolver
│   ├── middlewares/          # Edge & Node middleware helpers
│   │   ├── bot-detector.ts   # User-Agent crawler detector & honeypot blocker
│   │   └── auth-middleware.ts# Token validation middleware
│   ├── constants/            # Global constants
│   │   ├── domains.ts        # App port mappings & base URLs
│   │   ├── tenants.ts        # Sport tenants configuration (badminton, pickleball...)
│   │   ├── tournaments.ts    # Tournament schemas & static seed data
│   │   ├── cookies.ts        # Cookie names & expiration configs
│   │   └── locale.ts         # Supported locales (vi, en)
│   ├── hooks/                # Shared custom React hooks
│   │   ├── useBreakpoint.ts  # Responsive screen width tracker
│   │   ├── useDebounce.ts    # Search input debouncer
│   │   ├── useFetch.ts       # SWR-like data fetcher
│   │   └── useToggle.ts      # Boolean state toggler
│   └── types/                # Global TypeScript definitions & webmcp specs
└── package.json              # Package exports & dependencies
```

---

## 2. QUY CHUẨN HTTP CLIENT & XỬ LÝ TOKEN (AXIOS ARCHITECTURE)

### 2.1. Client-side vs Server-side API Client
* **Client-side Component:** Sử dụng `apiClient` mặc định (tự động đọc token từ cookie trình duyệt thông qua `request.interceptor.ts`):
  ```tsx
  import apiClient from "@workspace/shared/services/axiosConfig";
  const data = await apiClient.get("/api/venues");
  ```
* **Server-side Component (RSC):** Bắt buộc sử dụng `serverApiClient` truyền kèm token đọc từ `await cookies()`:
  ```tsx
  import { cookies } from "next/headers";
  import { serverApiClient } from "@workspace/shared/services/axiosConfig";

  export default async function ServerPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const client = serverApiClient(token || "");
    const data = await client.get("/api/venues");
    // ...
  }
  ```

### 2.2. Xử Lý Tự Động Làm Mới Token (Response Interceptor)
* Khi API trả về mã lỗi `401 Unauthorized`, response interceptor tự động gọi endpoint refresh token một lần duy nhất (`isRefreshing` queue lock). Nếu thành công, tự động thực hiện lại các request đang chờ trong hàng đợi.

---

## 3. QUY CHUẨN SSO AUTH UTILS (`@workspace/shared/utils/sso`)

* `getLoginUrl(returnUrl, locale)`: Sinh URL điều hướng sang `apps/account` (3003) kèm tham số callback an toàn.
* `getRegisterUrl(returnUrl, locale)`: Sinh URL chuyển hướng đăng ký.
* `clearAuthCookies()`: Xóa sạch phiên xác thực (`access_token`, `refresh_token`, `user_info`) trên toàn bộ cookie domain.

---

## 4. QUY CHUẨN ANTI-BOT & HONEYPOT (`@workspace/shared/middlewares/bot-detector`)

* Kiểm tra các User-Agent scraper nguy hiểm và crawler độc hại.
* Cung cấp hàm `detectBot(request)` và `createBotBlockedResponse(reason)` tích hợp trực tiếp vào `proxy.ts` của các ứng dụng con.

---

## 5. LỆNH KIỂM TRA & XÂY DỰNG (COMMANDS)

```bash
# Typecheck riêng cho package shared
pnpm --filter @workspace/shared typecheck

# Lint kiểm tra quy chuẩn
pnpm --filter @workspace/shared lint
```
