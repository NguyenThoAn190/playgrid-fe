# TIÊU CHUẨN THIẾT KẾ & HỆ THỐNG GIAO DIỆN PLAYGRID
> **Phiên bản:** 1.0  
> **Phạm vi áp dụng:** Toàn bộ hệ thống Web Application PlayGrid (Đặc biệt: Chi tiết giải đấu, Sự kiện, Câu lạc bộ, Bảng xếp hạng).

---

## 1. TỔNG QUAN & NGUYÊN TẮC THIẾT KẾ (DESIGN PRINCIPLES)

1. **Thống nhất (Consistency):** Toàn bộ giao diện sử dụng chung một hệ thống kích thước chữ, khoảng cách đệm, bo góc và bảng màu ngữ nghĩa (semantic tokens).
2. **Hỗ trợ Tiếng Việt 100% (Vietnamese Typography Integrity):** Không để xảy ra lỗi vỡ dấu, nhảy phông chữ khi hiển thị tiếng Việt có dấu.
3. **Phân cấp thị giác rõ ràng (Visual Hierarchy):** Người dùng có thể quét nhanh thông tin theo thứ tự: *Tiêu đề trang (H1) $\rightarrow$ Tiêu đề mục (H2) $\rightarrow$ Tên thẻ/Tính năng (H3) $\rightarrow$ Mô tả ngắn $\rightarrow$ Hành động (CTA)*.
4. **Hỗ trợ Light / Dark Mode hoàn chỉnh:** Sử dụng Tailwind Semantic CSS Variables (`bg-card`, `text-foreground`, `border-border`), không dùng màu hex cố định.

---

## 2. QUY CHUẨN TYPOGRAPHY (FONT SCALE & HIERARCHY)

### 2.1. Phông chữ chuẩn (Font Family)
* **Phông chữ bắt buộc:** `Inter` (Google Fonts).
* **Cấu hình Next.js:** 
  ```tsx
  import { Inter } from "next/font/google";

  const inter = Inter({
    subsets: ["latin", "vietnamese"],
    display: "swap",
    variable: "--font-sans",
  });
  ```

---

### 2.2. Bảng tỷ lệ & Phân cấp kích thước chữ (Type Scale)

| Phân cấp | Thẻ HTML | Tailwind Classes | Trọng số (Weight) | Mục đích sử dụng |
| :--- | :---: | :--- | :--- | :--- |
| **Page Title** | `<h1>` | `text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight` | `font-bold` | Tên giải đấu, tiêu đề chính của trang |
| **Section Title** | `<h2>` | `text-base sm:text-lg md:text-xl tracking-tight` | `font-bold` | Tiêu đề các Tab, tiêu đề các khối nội dung lớn |
| **Card / Feature Title** | `<h3>` | `text-sm sm:text-base` hoặc `text-base sm:text-lg` | `font-semibold` / `font-bold` | Tên thẻ VĐV, tên hạng mục thi đấu, tên gói tài trợ |
| **Sub-item / Table Head** | `<h4>` / `<th>` | `text-xs sm:text-sm` | `font-semibold` / `font-medium` | Tiêu đề cột bảng biểu, thẻ phụ, nhãn thông số |
| **Subtitle / Mô tả mục** | `<p>` | `text-xs sm:text-sm leading-normal` | `font-normal text-muted-foreground` | Đoạn mô tả ngắn dưới tiêu đề H2/H3 |
| **Body Content (Đoạn văn)**| `<p>` / `<div>` | `text-xs sm:text-sm leading-relaxed` | `font-normal text-foreground/90` | Nội dung bài viết, điều lệ, thể thức thi đấu |
| **Meta Information** | `<span>` | `text-xs leading-none` | `font-normal text-muted-foreground` | Thời gian, địa điểm, ngày đăng, số đếm |
| **Badges / Tags** | `<span>` | `text-[11px]` | `font-semibold` / `font-medium` | Huy hiệu trạng thái, trình độ, định dạng thi đấu |
| **Mini Badges / Counters** | `<span>` | `text-[10px]` - `text-[11px]` | `font-bold` | Số đếm số lượng trên Tab, số thứ tự podium (#1, #2) |

---

## 3. QUY CHUẨN MÀU SẮC (COLOR TOKENS & PALETTE)

### 3.1. Màu nền & Viền hệ thống (Semantic System Tokens)
* **Nền trang chính:** `bg-background`
* **Khối thẻ chính (Main Card):** `bg-card border border-border/80 shadow-2xs`
* **Khối thẻ phụ / Toolbar con:** `bg-muted/30 border border-border/70` hoặc `bg-muted/20`
* **Đường phân cách (Dividers):** `border-b border-border/50` hoặc `divide-y divide-border/40`

---

### 3.2. Màu thương hiệu & Nút hành động (Brand & CTAs)
* **Nút bấm chính nổi bật (Primary Action CTA):** 
  ```tsx
  className="bg-gradient-primary text-white font-bold rounded-2xl shadow-md hover:opacity-95 active:scale-[0.99] transition-all"
  ```
  *(Gradient chuẩn thương hiệu PlayGrid: `#0363FE` sang `#18E26E`)*
* **Nhấn thương hiệu (Accent Brand):** `text-primary`, `bg-primary`, `bg-primary/10`, `border-primary/20`
* **Thanh tiến độ đăng ký (Progress Fill):** `bg-gradient-primary` hoặc `bg-emerald-500`

---

### 3.3. Màu trạng thái & Ngữ cảnh (Status & Context Tokens)

| Ngữ cảnh | Màu Light Mode | Màu Dark Mode | Nền Badge | Viền |
| :--- | :--- | :--- | :--- | :--- |
| **Thành công / Còn vé** | `text-emerald-700` | `text-emerald-300` | `bg-emerald-500/15` | `border-emerald-500/20` |
| **Cảnh báo / Sắp hết vé** | `text-amber-700` | `text-amber-300` | `bg-amber-500/15` | `border-amber-500/20` |
| **Hết vé / Hạn chót** | `text-rose-600` | `text-rose-400` | `bg-rose-500/10` | `border-rose-500/20` |
| **Liên hệ Zalo / MXH** | `text-blue-600` | `text-blue-400` | `bg-blue-500/10` | `border-blue-500/30` |
| **Nội dung Nam / Đơn** | `text-blue-600` | `text-blue-400` | `bg-blue-500/10` | `border-blue-500/20` |
| **Nội dung Nữ / Đôi** | `text-pink-600` | `text-pink-400` | `bg-pink-500/10` | `border-pink-500/20` |

---

## 4. QUY CHUẨN CẤU TRÚC CONTAINER & BO GÓC (CARDS & RADII)

```
┌──────────────────────────────────────────────────────────────┐
│  Thẻ Card Chính (Main Card Container)                        │
│  Class: rounded-2xl sm:rounded-3xl p-4 sm:p-6                │
│         border border-border/80 bg-card shadow-2xs           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Khối Phụ Con / Sub-box (Toolbar, Item Strip, Pod)     │  │
│  │  Class: rounded-xl sm:rounded-2xl p-3.5 sm:p-5         │  │
│  │         border border-border/70 bg-muted/30            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

1. **Khối Card Chính (Level 1):**
   * Bo góc: `rounded-2xl sm:rounded-3xl`
   * Đệm trong: `p-4 sm:p-6`
   * Viền & Bóng: `border border-border/80 shadow-2xs bg-card`
2. **Khối Card Con / Danh sách Item (Level 2):**
   * Bo góc: `rounded-xl sm:rounded-2xl`
   * Đệm trong: `p-3.5 sm:p-4` hoặc `p-4 sm:p-5`
   * Viền: `border border-border/70 bg-muted/30` (hoặc `bg-muted/20`)
3. **Nút bấm (Buttons) & Ô nhập liệu (Inputs):**
   * Bo góc: `rounded-xl` (với nút to sticky: `rounded-2xl`)
   * Chiều cao chuẩn: `h-9` (size sm) hoặc `h-10` / `h-11` (size md/lg)
4. **Huy hiệu (Badges / Tags):**
   * Bo góc: `rounded-lg` hoặc `rounded-full`
   * Đệm trong: `px-2.5 py-0.5`
   * Font chữ: `text-[11px] font-semibold`

---

## 5. CÁC MẪU COMPONENT CHUẨN (STANDARD CODE PATTERNS)

### 5.1. Mẫu Tiêu Đề Khối Nội Dung (Section Header)
```tsx
<div className="space-y-1 pb-1">
  <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
    <Icon className="w-5 h-5 text-primary" />
    <span>Tiêu đề mục viết chữ hoa chữ cái đầu</span>
  </h2>
  <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
    Đoạn giải thích ngắn gọn, súc tích về mục đích của tính năng này.
  </p>
</div>
```

---

### 5.2. Mẫu Thẻ Chỉ Số KPI (Stat / Metric Card)
```tsx
<div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-xs font-semibold text-muted-foreground">Tên chỉ số thống kê</span>
    <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
      <Icon className="w-4 h-4" />
    </div>
  </div>

  <div className="space-y-1">
    <div className="text-2xl sm:text-3xl font-bold text-foreground">
      124 <span className="text-sm font-semibold text-muted-foreground">đơn vị</span>
    </div>
    <p className="text-xs text-muted-foreground font-normal">
      Mô tả phụ cho chỉ số hoặc tỷ lệ tăng trưởng.
    </p>
  </div>
</div>
```

---

### 5.3. Mẫu Bảng Biểu Chuẩn (Data Table Pattern)
```tsx
<div className="overflow-x-auto rounded-xl border border-border/60">
  <table className="w-full text-left text-xs border-collapse min-w-[680px]">
    <thead>
      <tr className="bg-muted/50 text-muted-foreground border-b border-border/60 font-semibold">
        <th className="py-3 px-4">Cột chính</th>
        <th className="py-3 px-3 text-center">Thông số</th>
        <th className="py-3 px-3 text-right">Phí tham dự</th>
        <th className="py-3 px-4 text-right">Trạng thái</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-border/40 text-foreground">
      <tr className="hover:bg-muted/20 transition-colors">
        <td className="py-3 px-4">
          <div className="font-semibold text-foreground text-xs sm:text-sm">Tên mục</div>
          <div className="text-xs text-muted-foreground font-normal">Thông tin phụ</div>
        </td>
        <td className="py-3 px-3 text-center text-xs text-muted-foreground font-medium">16+</td>
        <td className="py-3 px-3 text-right font-semibold text-foreground text-xs">500.000 ₫</td>
        <td className="py-3 px-4 text-right">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] inline-block border border-emerald-500/20">
            Còn chỗ
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 6. QUY TẮC CẦN TRÁNH (ANTI-PATTERNS)

❌ **Không sử dụng:**
* Các kích thước chữ tùy tiện không nằm trong scale: `text-[10.5px]`, `text-[13px]`, `text-[15px]`.
* Hardcode mã màu Hex trong file component: `style={{ color: "#0052FF" }}`, `from-[#0052FF] to-[#00E575]`.
* Dùng các màu Tailwind trần không qua dark mode: `text-gray-800`, `text-black`, `bg-white`.
* Nhảy cấp bậc heading (ví dụ: dùng `<h4>` ngay dưới `<h1>` mà bỏ qua `<h2>`, `<h3>`).
* Viết hoa toàn bộ câu chữ (ALL CAPS) ở các đoạn mô tả dài; chỉ dùng Title Case hoặc Sentence Case.

✅ **Luôn sử dụng:**
* Các class semantic tokens: `text-foreground`, `text-muted-foreground`, `bg-card`, `bg-muted/30`, `border-border/80`.
* Gradient thương hiệu chuẩn: `bg-gradient-primary text-white`.
* Badge chuẩn: `text-[11px] font-medium` hoặc `text-[11px] font-semibold`.
