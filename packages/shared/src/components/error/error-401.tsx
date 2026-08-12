export default function Unauthorized401() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-bold text-red-600">401 - Chưa xác thực</h2>
      <p className="text-sm text-muted-foreground mt-2">Vui lòng đăng nhập lại để tiếp tục.</p>
    </div>
  );
}
