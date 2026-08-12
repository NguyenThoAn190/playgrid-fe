import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

/**
 * Định dạng ngày giờ dựa trên múi giờ (timezone).
 * Nếu có truyền timezone, thời gian sẽ được định dạng theo múi giờ đó.
 * Nếu không truyền timezone, thời gian sẽ được định dạng theo múi giờ của thiết bị (trình duyệt).
 * 
 * @param value Giá trị ngày giờ (chuỗi ISO hoặc đối tượng Date)
 * @param timezone Múi giờ đích (ví dụ: "Asia/Ho_Chi_Minh", "UTC")
 * @param formatStr Chuỗi định dạng hiển thị, mặc định là "dd/MM/yyyy HH:mm"
 * @returns Chuỗi ngày giờ đã định dạng, hoặc "-" nếu không hợp lệ
 */
export function formatDateTime(
  value: string | Date | null | undefined,
  timezone?: string | null,
  formatStr: string = "dd/MM/yyyy HH:mm"
): string {
  if (!value) return "-";
  
  try {
    const date = new Date(value);
    // Kiểm tra xem Date có hợp lệ hay không
    if (isNaN(date.getTime())) {
      return String(value);
    }

    if (timezone && timezone.trim() !== "") {
      return formatInTimeZone(date, timezone, formatStr);
    }

    // Nếu không có timezone, sử dụng format của date-fns để tự động chuyển sang múi giờ của thiết bị
    return format(date, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return String(value);
  }
}
