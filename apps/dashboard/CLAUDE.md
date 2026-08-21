@AGENTS.md

# CLAUDE CODE GUIDE — PLAYGRID MERCHANT DASHBOARD (`apps/dashboard`)

> **Port:** `3001` | **Asset Prefix:** `/` | **Vai trò:** Merchant & Venue Manager Panel

---

## ⚡ QUICK COMMANDS
```bash
pnpm --filter dashboard dev          # Chạy dev server (Port 3001)
pnpm --filter dashboard typecheck    # Kiểm tra TypeScript type safety
pnpm --filter dashboard lint         # Chạy ESLint
pnpm --filter dashboard build        # Build production bundle
```

---

## 🛡️ ESSENTIAL RULES FOR `apps/dashboard`
1. **Merchant Domain:** Tập trung vào ma trận ca sân, bảng giá động, phân tích doanh thu và quản lý hội viên.
2. **Next.js 16 Async Dynamic APIs:** Luôn `await params` và `await searchParams` trong Server Components.
3. **Design System:** 100% OKLCH Semantic tokens (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-gradient-primary`). Cấm hardcode màu hex.
4. **Typography & Icons:** Font `Inter` (weights 400-700 only, cấm 800/900 và ALL-CAPS). 100% monochrome SVG từ `lucide-react`.
5. **i18n Links:** Luôn import `Link`, `useRouter`, `usePathname` từ `@/i18n/navigation`. Cấm `next/link`.
