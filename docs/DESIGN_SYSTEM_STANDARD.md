# TIÊU CHUẨN THIẾT KẾ & HỆ THỐNG GIAO DIỆN PLAYGRID
> **Phiên bản:** 1.3  
> **Phạm vi áp dụng:** Toàn bộ hệ thống Web Application PlayGrid (Chi tiết giải đấu, Sự kiện, Câu lạc bộ, Bảng xếp hạng, Đặt sân, Kèo đấu, Trang chủ).

---

## 1. TỔNG QUAN & NGUYÊN TẮC THIẾT KẾ (DESIGN PRINCIPLES)

1. **Thống nhất tuyệt đối với Hệ Thống Global CSS Tokens (Global CSS Integrity):**
   * **Bắt buộc 100% sử dụng hệ màu ngữ nghĩa (Semantic Tokens) từ `globals.css`:** `bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `text-muted-foreground`, `border-border`, `bg-primary`, `bg-gradient-primary`...
   * **Tuyệt đối không tự chế màu tùy tiện (No Ad-hoc/Fabricated Colors):** Không dùng màu hex cố định (`#1e293b`, `#00A859`), không dùng màu Tailwind trần (`text-black`, `bg-white`, `text-gray-900`) vì sẽ phá vỡ tính tương thích Light/Dark Mode.
2. **Chuẩn mực Typography Tiếng Việt (Vietnamese Typography Integrity):**
   * Sử dụng độ đậm chuẩn mực (`font-normal`, `font-medium`, `font-semibold`, `font-bold`).
   * **Tuyệt đối không dùng `font-extrabold` (800) hoặc `font-black` (900)** vì sẽ khiến dấu tiếng Việt (sắc, huyền, hỏi, ngã, nặng, mũ, móc) bị bẹt nét, dính chữ và tạo cảm giác nặng nề.
   * **Không viết hoa toàn bộ (NO ALL-CAPS / UPPERCASE)** ở tiêu đề, nhãn thẻ và nút bấm.
3. **Thanh thoát & Tinh tế (Light & Clean Aesthetics):**
   * **Không dùng icon emoji lòe loẹt** (🔥, ⏳, 🏆, 🏸, 👥, 🚗...); ưu tiên 100% vector SVG monochrome từ `lucide-react`.
   * **Không đổ bóng quá đậm** (`shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-black`); ưu tiên `shadow-2xs` và `shadow-xs`.
   * **Không tô viền card quá đậm hoặc quá dày**; sử dụng viền mỏng nhẹ theo biến ngữ nghĩa `border-border/80`.
4. **Phân cấp thị giác rõ ràng (Visual Hierarchy):** Người dùng có thể quét nhanh thông tin theo thứ tự: *Tiêu đề trang (H1) $\rightarrow$ Tiêu đề mục (H2) $\rightarrow$ Tên thẻ/Tính năng (H3) $\rightarrow$ Mô tả ngắn $\rightarrow$ Hành động (CTA)*.
5. **Hỗ trợ Light / Dark Mode hoàn chỉnh:** 100% tự động tương thích khi người dùng chuyển đổi theme.

---

## 2. QUY CHUẨN MÀU SẮC HỆ THỐNG (GLOBAL CSS COLOR TOKENS)

> [!IMPORTANT]
> Tất cả màu sắc trong toàn bộ ứng dụng phải được trỏ trực tiếp vào các biến ngữ nghĩa (Semantic Tokens) đã được định nghĩa tại `packages/ui/src/styles/globals.css`. Tuyệt đối không hardcode mã màu hoặc tự tạo màu mới ngoài hệ thống.

### 2.1. Bảng màu hệ thống chuẩn (System Semantic Tokens)

| Token Ngữ Nghĩa | Tailwind Class | Vai Trò & Mục Đích Sử Dụng |
| :--- | :--- | :--- |
| `--background` | `bg-background` | Màu nền chính của toàn bộ trang web (Light: Trắng / Dark: Deep Slate) |
| `--foreground` | `text-foreground` | Màu chữ chính, tiêu đề H1/H2, tên thẻ quan trọng |
| `--card` | `bg-card` | Nền các khối thẻ Card chứa nội dung Level 1 & Level 2 |
| `--card-foreground` | `text-card-foreground` | Màu chữ hiển thị bên trong khối Card |
| `--muted` | `bg-muted` hoặc `bg-muted/30`, `bg-muted/50` | Vùng nền phụ, sub-box, toolbar con, nền ô input, nền thẻ badge |
| `--muted-foreground`| `text-muted-foreground` | Màu chữ phụ, mô tả, subtitle, meta data (ngày, giờ, số đếm) |
| `--border` | `border-border`, `border-border/80`, `border-border/60` | Đường viền ngăn cách giữa các khối thẻ và các dòng bảng biểu |
| `--primary` | `bg-primary`, `text-primary`, `border-primary/20` | Màu thương hiệu chủ đạo (Xanh thể thao năng động) |
| `--primary-foreground` | `text-primary-foreground` | Màu chữ tương phản cao hiển thị trên nền `bg-primary` |
| `--gradient-primary` | `bg-gradient-primary text-white` | Gradient nhận diện thương hiệu độc quyền cho Nút bấm chính (CTA) |
| `--text-gradient-primary` | `text-gradient-primary` | Chữ có hiệu ứng gradient thương hiệu PlayGrid |
| `--secondary` | `bg-secondary`, `text-secondary-foreground` | Nút phụ, chip danh mục thứ cấp |
| `--accent` | `bg-accent`, `text-accent-foreground` | Vùng hover tương tác, trạng thái active nhẹ |
| `--destructive` | `bg-destructive`, `text-destructive` | Nút hành động nguy hiểm, trạng thái cảnh báo lỗi/hết vé |

---

### 2.2. Bảng màu trạng thái & Ngữ cảnh chuẩn (Status & Context)

| Ngữ cảnh | Màu Light Mode | Màu Dark Mode | Nền Badge | Viền Ngữ Nghĩa |
| :--- | :--- | :--- | :--- | :--- |
| **Thành công / Còn vé** | `text-emerald-700` | `text-emerald-300` | `bg-emerald-500/15` | `border-emerald-500/20` |
| **Cảnh báo / Sắp hết vé** | `text-amber-700` | `text-amber-300` | `bg-amber-500/15` | `border-amber-500/20` |
| **Hết vé / Hạn chót** | `text-rose-600` | `text-rose-400` | `bg-rose-500/10` | `border-rose-500/20` |
| **Liên hệ Zalo / MXH** | `text-blue-600` | `text-blue-400` | `bg-blue-500/10` | `border-blue-500/30` |

---

## 3. QUY CHUẨN TYPOGRAPHY (FONT SCALE & WEIGHTS)

### 3.1. Phông chữ chuẩn (Font Family)
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

### 3.2. Bảng tỷ lệ & Trọng số font chữ (Type Scale & Weights)

| Phân cấp | Thẻ HTML | Tailwind Classes | Trọng số (Weight) | Mục đích sử dụng |
| :--- | :---: | :--- | :--- | :--- |
| **Page Title** | `<h1>` | `text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight` | `font-bold` (700) | Tên giải đấu, tiêu đề chính của trang |
| **Section Title** | `<h2>` | `text-base sm:text-lg md:text-xl tracking-tight` | `font-bold` (700) | Tiêu đề các Tab, tiêu đề các khối nội dung lớn |
| **Card / Feature Title** | `<h3>` | `text-sm sm:text-base` hoặc `text-base sm:text-lg` | `font-semibold` (600) | Tên thẻ VĐV, tên hạng mục thi đấu, tên gói tài trợ |
| **Sub-item / Table Head** | `<h4>` / `<th>` | `text-xs sm:text-sm` | `font-semibold` (600) / `font-medium` (500) | Tiêu đề cột bảng biểu, thẻ phụ, nhãn thông số |
| **Subtitle / Mô tả mục** | `<p>` | `text-xs sm:text-sm leading-normal` | `font-normal` (400) `text-muted-foreground` | Đoạn mô tả ngắn dưới tiêu đề H2/H3 |
| **Body Content (Đoạn văn)**| `<p>` / `<div>` | `text-xs sm:text-sm leading-relaxed` | `font-normal` (400) `text-foreground/90` | Nội dung bài viết, điều lệ, thể thức thi đấu |
| **Meta Information** | `<span>` | `text-xs leading-none` | `font-normal` (400) `text-muted-foreground` | Thời gian, địa điểm, ngày đăng, số đếm |
| **Badges / Tags** | `<span>` | `text-[11px]` | `font-semibold` (600) / `font-medium` (500) | Huy hiệu trạng thái, trình độ, định dạng thi đấu |
| **KPI / Elo / Giá tiền** | `<span>` / `<div>` | `text-base sm:text-xl` | `font-bold` (700) | Điểm số Elo, giá tiền, số liệu thống kê |

---

### 3.3. Quy tắc chuẩn về độ đậm và kiểu chữ (Weight & Text Transform)

* **`font-normal` (400):** Áp dụng cho **100%** đoạn văn bản mô tả, giải thích, nội dung bài viết, ghi chú, thông tin phụ và meta data.
* **`font-medium` (500):** Áp dụng cho nhãn thông tin phụ, label form nhập liệu, tiêu đề cột bảng biểu.
* **`font-semibold` (600):** Áp dụng cho tiêu đề thẻ Card con (H3), nhãn nút bấm phụ (Secondary Button), huy hiệu (Badges), tên người dùng.
* **`font-bold` (700):** Áp dụng cho tiêu đề chính (H1, H2), nút bấm hành động chính (Primary CTA), chỉ số KPI và giá tiền.
* 🚫 **CẤM DÙNG `font-extrabold` (800) & `font-black` (900):** Giúp văn bản luôn thanh thoát, nét chữ mượt mà và không bị thô.
* 🚫 **CẤM DÙNG `uppercase` (ALL-CAPS):** Luôn dùng **Title Case** (*Viết Hoa Chữ Cái Đầu Mỗi Từ*) hoặc **Sentence Case** (*Chỉ viết hoa đầu câu*).

---

## 4. QUY CHUẨN ICONS & HÌNH HỌA (ICONS & GRAPHICS STANDARD)

* 🚫 **CẤM DÙNG Emoji màu lòe loẹt trực tiếp trong UI (No Color Emojis):** 
  * Tuyệt đối không chèn trực tiếp các ký tự emoji đa sắc như: `🔥`, `⏳`, `🏆`, `🏸`, `👥`, `👫`, `🛡️`, `👑`, `🚗`, `⚡`, `⭐` vào tiêu đề, nhãn tab, nút bấm hay badge.
* ✅ **ƯU TIÊN 100% SVG Vector Icons từ `lucide-react`:**
  * Sử dụng icon đơn sắc từ thư viện `lucide-react`: `Flame`, `Hourglass`, `Trophy`, `Users`, `UserCheck`, `Shield`, `Crown`, `MapPin`, `Calendar`, `Sparkles`, `CheckCircle2`, `Car`, `Zap`, `Star`...
  * **Kích thước chuẩn:**
    * Nhỏ (Badge / Meta / Pill): `w-3.5 h-3.5`
    * Tiêu chuẩn (Button / Input / Table Row / Item): `w-4 h-4`
    * Tiêu đề mục (Section Header H2 / Header Card): `w-5 h-5`
  * **Màu sắc ngữ nghĩa:** Sử dụng semantic classes như `text-primary`, `text-amber-500`, `text-emerald-500`, `text-muted-foreground`.

---

## 5. QUY CHUẨN CONTAINER, VIỀN & ĐỔ BÓNG (CARDS, BORDERS & SHADOWS)

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

### 5.1. Quy chuẩn Viền (Borders)
* 🚫 **Không tô viền quá đậm hoặc quá dày:** Cấm dùng `border-2`, `border-4`, `border-black`, `border-gray-600`, `border-slate-800` trên toàn bộ thẻ card.
* ✅ **Viền mỏng nhẹ theo hệ thống semantic tokens:**
  * Khối Card chính Level 1: `border border-border/80`.
  * Khối Card con Level 2 / Toolbar / Item: `border border-border/70` hoặc `border border-border/50`.
  * Đường phân cách (Dividers): `border-b border-border/50` hoặc `divide-y divide-border/40`.
  * Khối Highlight / Active state: `border border-primary/20 bg-primary/5`.

---

### 5.2. Quy chuẩn Đổ bóng (Shadows)
* 🚫 **Không đổ bóng quá đậm (No Heavy Shadows):** Tránh dùng `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-black/50`.
* ✅ **Đổ bóng vi mô tinh tế (Micro-elevation):**
  * Thẻ Card mặc định: `shadow-2xs`.
  * Hover Card / Active Card / Popover: `shadow-xs` hoặc `shadow-sm`.
  * Nút bấm chính (CTA): `shadow-2xs`.

---

## 6. CÁC MẪU COMPONENT CHUẨN (STANDARD CODE PATTERNS)

### 6.1. Mẫu Tiêu Đề Khối Nội Dung (Section Header)
```tsx
<div className="space-y-1 pb-1">
  <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
    <Trophy className="w-5 h-5 text-primary shrink-0" />
    <span>Tiêu Đề Mục Viết Title Case</span>
  </h2>
  <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
    Đoạn giải thích ngắn gọn, súc tích về mục đích của tính năng này.
  </p>
</div>
```

---

### 6.2. Mẫu Thẻ Chỉ Số KPI (Stat / Metric Card)
```tsx
<div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-xs font-medium text-muted-foreground">Tên chỉ số thống kê</span>
    <div className="size-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
      <Activity className="w-4 h-4" />
    </div>
  </div>

  <div className="space-y-1">
    <div className="text-2xl sm:text-3xl font-bold text-foreground">
      124 <span className="text-sm font-normal text-muted-foreground">đơn vị</span>
    </div>
    <p className="text-xs text-muted-foreground font-normal">
      Mô tả phụ cho chỉ số hoặc tỷ lệ tăng trưởng.
    </p>
  </div>
</div>
```

---

### 6.3. Mẫu Nút Bấm Hành Động Chính (Primary CTA Button)
```tsx
<Button
  type="button"
  className="h-10 px-5 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-2xs hover:opacity-95 active:scale-95 transition-all cursor-pointer"
>
  <Sparkles className="w-4 h-4 mr-1.5" />
  <span>Đăng Ký Tham Gia Ngay</span>
</Button>
```

---

## 7. BẢNG TỔNG KẾT NGUYÊN TẮC CẦN TRÁNH (ANTI-PATTERNS)

| Thành phần | ❌ TUYỆT ĐỐI TRÁNH (Anti-Patterns) | ✅ LUÔN SỬ DỤNG (Best Practices) |
| :--- | :--- | :--- |
| **Hệ Màu (Color System)** | Tự chế mã màu Hex (`#0363FE`), tự đặt màu Tailwind trần (`text-black`, `bg-white`, `text-gray-900`) | **100% sử dụng semantic tokens từ globals.css** (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border`) |
| **Icons** | Dùng emoji màu lòe loẹt (`🔥`, `⏳`, `🏆`, `🏸`, `🚗`) | Dùng vector SVG monochrome từ `lucide-react` (`Flame`, `Hourglass`, `Trophy`, `Car`) |
| **Độ bóng (Shadows)** | Đổ bóng quá đậm (`shadow-lg`, `shadow-xl`, `shadow-2xl`) | Bóng vi mô tinh tế (`shadow-2xs` hoặc `shadow-xs`) |
| **Kiểu chữ (Case)** | Viết hoa toàn bộ (`uppercase`, `ALL CAPS`) | Dùng **Title Case** hoặc **Sentence Case** |
| **Độ đậm (Weights)** | Lạm dụng `font-extrabold` (800) và `font-black` (900) | `font-bold` (700), `font-semibold` (600), `font-normal` (400) |
| **Viền Card (Borders)**| Viền dày `border-2`, `border-4` hoặc màu đen xám đậm | Viền mỏng nhẹ ngữ nghĩa `border border-border/80` |
| **Đoạn văn (Body)** | Dùng `font-semibold` hoặc `font-bold` cho mô tả | Luôn dùng `font-normal text-muted-foreground` |
