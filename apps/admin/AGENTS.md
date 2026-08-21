<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PLAYGRID SUPER ADMIN — AGENT & DEVELOPER BIBLE (`apps/admin`)

> **Phân vùng:** `apps/admin`  
> **Port:** `3002` | **Asset Prefix:** `/`  
> **Vai trò:** Bảng điều khiển quản trị viên tối cao (Super Admin), quản lý tenant, kiểm duyệt chủ sân, phân quyền hệ thống và kiểm toán hoạt động.

---

## 1. TỔNG QUAN PHÂN VÙNG `apps/admin`

`apps/admin` là cổng quản trị trung tâm dành riêng cho đội ngũ vận hành và Super Admin của nền tảng PlayGrid. Ứng dụng cung cấp các công cụ kiểm duyệt tài khoản chủ sân, kích hoạt tenant môn thể thao mới, theo dõi toàn bộ dòng tiền thanh toán và cấu hình các thông số hệ thống toàn cục.

### 1.1. Cấu Trúc Thư Mục
```
apps/admin/
├── app/
│   ├── [locale]/             # Next-intl localized admin routes
│   │   ├── layout.tsx        # Admin shell layout with security badge & nav
│   │   └── page.tsx          # System metrics overview & audit feed
│   └── proxy.ts              # next-intl middleware for admin
├── components/               # Admin tables, status chips, approval modals, audit logs
├── messages/                 # vi.json, en.json translation dictionaries
└── next.config.ts            # Next.js 16 config & transpilePackages
```

---

## 2. QUY CHUẨN BẢO MẬT & PHÂN QUYỀN (ADMIN SECURITY)

1. **Role-Based Access Control (RBAC):**
   * Chỉ người dùng có role `super_admin` hoặc `system_operator` trong JWT/Cookie mới được phép truy cập.
2. **Audit Trails (Nhật ký kiểm toán):**
   * Mọi hành động duyệt sân bãi, khóa tài khoản, hoàn tiền hoặc chỉnh sửa cấu hình hệ thống phải ghi nhận log đầy đủ (admin id, timestamp, action type, changes).

---

## 3. QUY TẮC NEXT.JS 16 & REACT 19 TRONG `apps/admin`

1. **Async Dynamic APIs:**
   * Trong Server Components, `params` và `searchParams` là Promise (`await params`, `await searchParams`).
2. **Server-side Auth Verification:**
   * Kiểm tra quyền quản trị viên ngay tại Server Component Layout trước khi render dữ liệu nhạy cảm.

---

## 4. DESIGN SYSTEM & GIAO DIỆN

* **100% Semantic OKLCH Tokens:** `bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-primary`, `bg-destructive`.
* **Trạng thái kiểm duyệt:**
  * Đã duyệt (Active): `text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/20`
  * Chờ duyệt (Pending): `text-amber-700 dark:text-amber-300 bg-amber-500/15 border-amber-500/20`
  * Từ chối / Đã khóa (Banned): `text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20`
* **Typography:** Font `Inter`, weights 400–700. Cấm `font-extrabold` (800) / `font-black` (900), cấm `uppercase` (ALL-CAPS).
* **Icons:** 100% SVG Vector từ `lucide-react` (`ShieldAlert`, `Users`, `Building2`, `Activity`, `FileText`).

---

## 5. LỆNH PHÁT TRIỂN (COMMANDS)

```bash
# Chạy dev server cho Super Admin (Port 3002)
pnpm --filter admin dev

# Typecheck & Lint riêng cho apps/admin
pnpm --filter admin typecheck
pnpm --filter admin lint

# Build production bundle
pnpm --filter admin build
```
