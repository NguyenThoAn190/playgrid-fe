@AGENTS.md

# CLAUDE CODE GUIDE — PLAYGRID WEB PORTAL (`apps/web`)

> **Port:** `3000` | **Asset Prefix:** `/` | **Vai trò:** Main Public Portal & Multi-Zone Proxy

---

## ⚡ QUICK COMMANDS
```bash
pnpm --filter web dev          # Chạy dev server (Port 3000)
pnpm --filter web typecheck    # Kiểm tra TypeScript type safety
pnpm --filter web lint         # Chạy ESLint
pnpm --filter web build        # Build production bundle
```

---

## 🛡️ ESSENTIAL RULES FOR `apps/web`
1. **Multi-Zone Proxying:** `apps/web` thực hiện rewrite `/account-static/*`, `/:locale/login`, `/:locale/register`, `/:locale/account` sang `apps/account` (3003) và `/payment-static/*`, `/:locale/payment`, `/:locale/checkout` sang `apps/payment` (3004).
2. **Next.js 16 Async Dynamic APIs:** Luôn `await params` và `await searchParams` trong Server Components.
3. **Anti-bot Trap:** Không sửa đổi logic honeypot trap `pg_bot_flag` trong `proxy.ts` nếu không có yêu cầu bảo mật cụ thể.
4. **Design System:** 100% OKLCH Semantic tokens (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-gradient-primary`). Cấm hardcode màu hex hoặc màu Tailwind trần.
5. **Vietnamese Typography:** Font `Inter`, weights 400, 500, 600, 700. Cấm `font-extrabold` (800) / `font-black` (900), cấm `uppercase` (ALL-CAPS).
6. **Icons:** 100% vector SVG monochrome từ `lucide-react`. Cấm emoji màu (`🔥`, `🏆`, `🏸`, `🚗`) trong UI.
7. **i18n Links:** Luôn import `Link`, `useRouter`, `usePathname` từ `@/i18n/navigation`. Cấm `next/link`.

