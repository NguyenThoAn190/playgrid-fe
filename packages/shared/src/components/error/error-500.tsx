export default function ServerError500() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-red-500">500 - Lỗi hệ thống</h2>
      <p className="text-sm text-muted-foreground mt-2">Đã xảy ra lỗi từ phía máy chủ. Vui lòng thử lại sau.</p>
    </div>
  );
}
