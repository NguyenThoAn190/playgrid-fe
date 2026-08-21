@AGENTS.md

# CLAUDE CODE GUIDE — PLAYGRID SSO & ACCOUNT (`apps/account`)

> **Port:** `3003` | **Asset Prefix:** `/account-static` | **Vai trò:** SSO Auth & User Profile

---

## ⚡ QUICK COMMANDS
```bash
pnpm --filter account dev          # Chạy dev server (Port 3003)
pnpm --filter account typecheck    # Kiểm tra TypeScript type safety
pnpm --filter account lint         # Chạy ESLint
pnpm --filter account build        # Build production bundle
```

---

## 🛡️ ESSENTIAL RULES FOR `apps/account`
1. **Asset Prefix:** Phân vùng này sử dụng `assetPrefix: "/account-static"`. Mọi resource static phải qua prefix `/account-static`.
2. **SSO Cookies:** Quản lý `access_token`, `refresh_token`, `user_info`, `playgrid_theme` qua `@workspace/shared/utils/sso`.
3. **Safe Redirects:** Kiểm tra và làm sạch `redirect_uri` / `return_url` trước khi chuyển hướng người dùng sau khi đăng nhập thành công.
4. **React 19 State in Effect:** Cấm gọi `setState` đồng bộ trong thân `useEffect` (`react-hooks/set-state-in-effect`).
5. **Design System:** 100% OKLCH Semantic tokens (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-gradient-primary`). Cấm hardcode màu hex.
6. **Typography & Icons:** Font `Inter` (weights 400-700 only, cấm 800/900 và ALL-CAPS). 100% monochrome SVG từ `lucide-react`.
