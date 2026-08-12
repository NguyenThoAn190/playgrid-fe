export interface TenantValidationResult {
  isValid: boolean;
  correctUrl?: string;
}

/**
 * Kiểm tra xem tài nguyên có thuộc về tenant hiện tại hay không.
 * Nếu không, trả về URL đúng để redirect.
 */
export function validateResourceTenant(
  resourceTenant: string,
  activeTenant: string,
  currentPathname: string,
  host: string
): TenantValidationResult {
  if (resourceTenant === activeTenant) {
    return { isValid: true };
  }

  // Tái cấu trúc URL với subdomain đúng
  const hostParts = host.split(".");
  const isLocalhost = host.includes("localhost");
  
  let newHost = host;
  if (isLocalhost) {
    newHost = `${resourceTenant}.localhost:3000`;
  } else {
    // Production: thay thế subdomain đầu tiên bằng tenant đúng
    if (hostParts.length > 2) {
      hostParts[0] = resourceTenant;
      newHost = hostParts.join(".");
    } else {
      newHost = `${resourceTenant}.${host}`;
    }
  }

  return {
    isValid: false,
    correctUrl: `http://${newHost}${currentPathname}`
  };
}
