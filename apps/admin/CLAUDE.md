@AGENTS.md

# CLAUDE CODE GUIDE — PLAYGRID SUPER ADMIN (`apps/admin`)

> **Port:** `3002` | **Asset Prefix:** `/` | **Vai trò:** Super Admin Management Panel

---

## ⚡ QUICK COMMANDS
```bash
pnpm --filter admin dev          # Chạy dev server (Port 3002)
pnpm --filter admin typecheck    # Kiểm tra TypeScript type safety
pnpm --filter admin lint         # Chạy ESLint
pnpm --filter admin build        # Build production bundle
```

---

## 🛡️ ESSENTIAL RULES FOR `apps/admin`
1. **Security & RBAC:** Kiểm tra nghiêm ngặt quyền Super Admin trước khi thực thi các thao tác can thiệp dữ liệu.
2. **Next.js 16 Async Dynamic APIs:** Luôn `await params` và `await searchParams` trong Server Components.
3. **Design System:** 100% OKLCH Semantic tokens (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-primary`). Cấm hardcode màu hex.
4. **Typography & Icons:** Font `Inter` (weights 400-700 only, cấm 800/900 và ALL-CAPS). 100% monochrome SVG từ `lucide-react`.
5. **i18n Links:** Luôn import `Link`, `useRouter`, `usePathname` từ `@/i18n/navigation`. Cấm `next/link`.
