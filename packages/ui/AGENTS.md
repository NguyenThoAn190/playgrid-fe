# PLAYGRID UI LIBRARY — AGENT & DEVELOPER BIBLE (`packages/ui`)

> **Package:** `@workspace/ui`  
> **Đường dẫn:** `packages/ui`  
> **Vai trò:** Thư viện giao diện dùng chung (UI Primitives & Design System Tokens) cho toàn bộ ứng dụng trong monorepo PlayGrid Frontend.

---

## 1. TỔNG QUAN PACKAGE `@workspace/ui`

`packages/ui` định nghĩa toàn bộ quy chuẩn thiết kế, bảng màu ngữ nghĩa OKLCH, cấu hình Tailwind CSS v4 và các thành phần giao diện cơ sở (UI Primitives) xây dựng trên nền tảng `@base-ui/react` và `shadcn`. Mọi component ở đây đều phải đảm bảo tương thích 100% cả hai chế độ **Light Mode** và **Dark Mode**.

### 1.1. Cấu Trúc Thư Mục
```
packages/ui/
├── src/
│   ├── components/           # UI Components cơ sở
│   │   ├── button.tsx        # Button với gradient-primary & variants
│   │   ├── badge.tsx         # Status & Context badges
│   │   ├── card.tsx          # Card container, Header, Content, Footer
│   │   ├── input.tsx         # Text input & Search field
│   │   ├── select.tsx        # Accessible dropdown selector
│   │   ├── avatar.tsx        # User avatar & fallback
│   │   ├── dropdown-menu.tsx # Popover dropdown menu
│   │   ├── theme-provider.tsx# Next-themes dark/light provider
│   │   └── theme-toggle.tsx  # Quick theme switch button
│   ├── styles/
│   │   └── globals.css       # Semantic OKLCH tokens, utilities, base styles
│   ├── hooks/                # UI-specific React hooks
│   └── lib/                  # utils (cn, clsx, tailwind-merge)
└── package.json              # Package exports & dependencies
```

---

## 2. QUY CHUẨN DESIGN TOKENS & CSS (100% OKLCH SEMANTIC)

> [!IMPORTANT]
> Toàn bộ màu sắc và hiệu ứng thị giác PHẢI sử dụng CSS Variables & Semantic Tokens từ `globals.css`. Tuyệt đối không hardcode mã màu Hex hoặc màu Tailwind trần.

### 2.1. Bảng Tra Cứu Semantic Tokens

| Token | Tailwind Class | Mục Đích |
| :--- | :--- | :--- |
| `--background` | `bg-background` | Nền chính của toàn trang |
| `--foreground` | `text-foreground` | Màu chữ chính |
| `--card` | `bg-card` | Nền khối thẻ Card |
| `--card-foreground`| `text-card-foreground` | Màu chữ trên thẻ Card |
| `--muted` | `bg-muted` | Nền phụ, toolbar, sub-box |
| `--muted-foreground`| `text-muted-foreground` | Màu chữ phụ, mô tả, subtitle |
| `--border` | `border-border/80` | Viền thanh mảnh ngăn cách |
| `--primary` | `bg-primary`, `text-primary` | Màu thương hiệu chủ đạo |
| `--gradient-primary`| `bg-gradient-primary text-white` | Gradient nhận diện cho nút CTA chính |
| `--accent` | `bg-accent`, `text-accent-foreground` | Vùng hover tương tác |
| `--destructive` | `bg-destructive`, `text-destructive` | Cảnh báo lỗi, trạng thái nguy hiểm |

### 2.2. Tiện Ích Độc Quyền (PlayGrid Utilities)
* `bg-gradient-primary`: Nền gradient nhận diện PlayGrid (Xanh dương sang Xanh lá thể thao).
* `text-gradient-primary`: Chữ gradient thương hiệu PlayGrid.
* `shadow-glow-primary`: Hiệu ứng phát sáng neon tinh tế cho các thành phần đặc biệt.
* `no-scrollbar`: Ẩn thanh cuộn trình duyệt nhưng vẫn cho phép cuộn nội dung.

---

## 3. NGUYÊN TẮC THIẾT KẾ COMPONENT (COMPONENT INVARIANTS)

1. **Chuẩn Mực Typography Tiếng Việt:**
   * Sử dụng trọng số: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700).
   * **CẤM `font-extrabold` (800) & `font-black` (900)**.
   * **CẤM `uppercase` (ALL-CAPS)**; dùng **Title Case** hoặc **Sentence Case**.
2. **Iconography:**
   * 100% Vector Monochrome SVG từ `lucide-react`. **CẤM emoji màu trong component**.
3. **Độ Nổi & Viền (Elevation & Borders):**
   * Bo góc: `rounded-2xl` hoặc `rounded-3xl` cho card lớn; `rounded-xl` cho sub-box/button.
   * Viền mỏng: `border border-border/80`. Cấm `border-2`, `border-4`.
   * Đổ bóng vi mô: `shadow-2xs` hoặc `shadow-xs`. Cấm `shadow-lg`, `shadow-xl`, `shadow-2xl`.

---

## 4. QUY ƯỚC XUẤT BẢN & IMPORT (PACKAGE EXPORTS)

Các ứng dụng trong monorepo import component từ `@workspace/ui`:
```tsx
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectItem } from "@workspace/ui/components/select";
```

---

## 5. LỆNH PHÁT TRIỂN & KIỂM TRA (COMMANDS)

```bash
# Typecheck riêng cho package UI
pnpm --filter @workspace/ui typecheck

# Lint kiểm tra quy chuẩn mã nguồn
pnpm --filter @workspace/ui lint

# Định dạng code với Prettier
pnpm --filter @workspace/ui format
```
