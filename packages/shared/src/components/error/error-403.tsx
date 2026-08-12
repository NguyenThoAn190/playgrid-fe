export default function Forbidden403() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-amber-600">403 - Truy cập bị từ chối</h2>
      <p className="text-sm text-muted-foreground mt-2">Bạn không có quyền truy cập vào tài nguyên này.</p>
    </div>
  );
}
