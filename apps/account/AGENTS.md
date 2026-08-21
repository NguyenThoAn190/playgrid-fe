<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PLAYGRID SSO & ACCOUNT — AGENT & DEVELOPER BIBLE (`apps/account`)

> **Phân vùng:** `apps/account`  
> **Port:** `3003` | **Asset Prefix:** `/account-static`  
> **Vai trò:** Trung tâm xác thực SSO Đăng nhập / Đăng ký, Quên mật khẩu, Đăng xuất và Quản lý hồ sơ cá nhân / Cài đặt tài khoản.

---

## 1. TỔNG QUAN PHÂN VÙNG `apps/account`

`apps/account` là phân vùng micro-frontend độc lập chịu trách nhiệm về luồng danh tính và xác thực tập trung (Single Sign-On - SSO) cho toàn bộ hệ sinh thái PlayGrid. Khi người dùng bấm "Đăng nhập" từ bất kỳ ứng dụng nào (`web`, `payment`, `dashboard`), họ sẽ được điều hướng tới `apps/account` kèm theo tham số `redirect_uri` hoặc `return_url`.

### 1.1. Cấu Trúc Thư Mục
```
apps/account/
├── app/
│   ├── [locale]/             # Next-intl localized routes (/vi, /en)
│   │   ├── login/            # SSO Login page with OAuth providers & password form
│   │   ├── register/         # User registration form & email verification
│   │   ├── logout/           # SSO Logout handler (clears cookies & session)
│   │   ├── forgot-password/  # Password recovery workflow
│   │   ├── layout.tsx        # Auth layout with branded backdrop & language switcher
│   │   └── page.tsx          # Account Profile & User Settings overview
│   ├── api/                  # BFF auth handlers & session check endpoints
│   ├── manifest.ts           # PWA Web Manifest
│   └── proxy.ts              # next-intl middleware + auth redirect proxy
├── components/               # Auth form components, social login buttons, profile tabs
├── messages/                 # vi.json, en.json translation dictionaries
└── next.config.ts            # assetPrefix: '/account-static' & rewrites
```

---

## 2. QUY CHUẨN XÁC THỰC SSO & QUẢN LÝ COOKIE

### 2.1. Cấu Trúc Phiên Làm Việc (Session Cookies)
Tất cả cookie xác thực được lưu trên domain chung để chia sẻ phiên liền mạch giữa tất cả các Zone:
* `access_token`: JWT access token ngắn hạn dùng cho API requests.
* `refresh_token`: JWT refresh token dùng để cấp lại token mới tự động.
* `user_info`: JSON chứa thông tin cơ bản của người dùng (id, name, avatar, role, phone).
* `playgrid_theme`: Trạng thái giao diện (`light` hoặc `dark`).

### 2.2. Quy Trình Điều Hướng & Callbacks (Redirect URIs)
* Sau khi đăng nhập hoặc đăng ký thành công, đọc `redirect_uri` từ URL params.
* Sử dụng hàm `getLoginUrl` / `getRegisterUrl` từ `@workspace/shared/utils/sso`.
* Khi đăng xuất, gọi `clearAuthCookies()` để dọn sạch toàn bộ session cookies trước khi chuyển hướng.

---

## 3. QUY TẮC NEXT.JS 16 & REACT 19 TRONG `apps/account`

1. **Async Dynamic Parameters & Cookies:**
   * Trong Server Components, `params` và `searchParams` là Promise:
   ```tsx
   interface PageProps {
     params: Promise<{ locale: string }>;
     searchParams: Promise<{ redirect_uri?: string }>;
   }

   export default async function LoginPage({ params, searchParams }: PageProps) {
     const { locale } = await params;
     const { redirect_uri } = await searchParams;
     // ...
   }
   ```
2. **Cấm gọi `setState` đồng bộ trong `useEffect` (`react-hooks/set-state-in-effect`):**
   * Trong form đăng nhập/đăng ký, không cập nhật `setIsCheckingAuth(false)` đồng bộ trong effect. Hãy tính toán từ state/props hoặc đưa vào callback async.
3. **Asset Prefix & Rewrite Mapping:**
   * Cấu hình `assetPrefix: '/account-static'` bắt buộc phải khớp với các rewrite của `apps/web`.

---

## 4. DESIGN SYSTEM & GIAO DIỆN

* **100% Semantic OKLCH Tokens:** `bg-background`, `text-foreground`, `bg-card`, `border-border/80`, `bg-gradient-primary`, `text-primary`.
* **Typography:** Font `Inter`, trọng số 400, 500, 600, 700. Cấm `font-extrabold` (800) / `font-black` (900), cấm `uppercase` (ALL-CAPS).
* **Icons:** 100% SVG Vector từ `lucide-react`. Cấm emoji màu trong form hoặc nút bấm.
* **Tối ưu hình ảnh:** Bắt buộc dùng `<Image />` từ `next/image` cho logo và avatar.

---

## 5. LỆNH PHÁT TRIỂN (COMMANDS)

```bash
# Chạy dev server cho SSO & Account (Port 3003)
pnpm --filter account dev

# Typecheck & Lint riêng cho apps/account
pnpm --filter account typecheck
pnpm --filter account lint

# Build production bundle
pnpm --filter account build
```
