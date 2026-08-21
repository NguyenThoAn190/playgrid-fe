@AGENTS.md

# CLAUDE CODE GUIDE — PLAYGRID SHARED LIBRARY (`packages/shared`)

> **Package:** `@workspace/shared` | **Vai trò:** Shared Business Logic, API Clients & Utilities

---

## ⚡ QUICK COMMANDS
```bash
pnpm --filter @workspace/shared typecheck    # Kiểm tra TypeScript type safety
pnpm --filter @workspace/shared lint         # Chạy ESLint
```

---

## 🛡️ ESSENTIAL RULES FOR `@workspace/shared`
1. **API Client Invariants:** Dùng `apiClient` cho client-side và `serverApiClient(token)` cho Server Components (SSR).
2. **SSO Helpers:** Mọi xử lý URL login, register, logout bắt buộc dùng `sso.ts`.
3. **No Direct UI Rendering:** `@workspace/shared` chỉ chứa business logic, hooks, types, constants, middlewares. Không import các thư viện UI nặng nề.
4. **Strict Typing:** Đảm bảo 100% type safety cho DTOs, schemas và response types.
