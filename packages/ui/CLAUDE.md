@AGENTS.md

# CLAUDE CODE GUIDE — PLAYGRID UI LIBRARY (`packages/ui`)

> **Package:** `@workspace/ui` | **Vai trò:** Design System & UI Primitives

---

## ⚡ QUICK COMMANDS
```bash
pnpm --filter @workspace/ui typecheck    # Kiểm tra TypeScript type safety
pnpm --filter @workspace/ui lint         # Chạy ESLint
pnpm --filter @workspace/ui format       # Định dạng code với Prettier
```

---

## 🛡️ ESSENTIAL RULES FOR `@workspace/ui`
1. **100% Semantic OKLCH Tokens:** Mọi style dùng token từ `globals.css` (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-gradient-primary`). Cấm hardcode màu hex hoặc màu Tailwind trần.
2. **Typography Tiếng Việt:** Font `Inter`, trọng số 400, 500, 600, 700. Cấm `font-extrabold` (800) / `font-black` (900), cấm `uppercase` (ALL-CAPS).
3. **Icons:** 100% SVG Vector từ `lucide-react`. Cấm emoji màu.
4. **Borders & Shadows:** `border-border/80`, `shadow-2xs`. Cấm viền dày (`border-2`, `border-4`) và bóng đậm (`shadow-lg`, `shadow-xl`).
5. **Accessibility:** Kế thừa accessibility từ `@base-ui/react` và `shadcn`.
