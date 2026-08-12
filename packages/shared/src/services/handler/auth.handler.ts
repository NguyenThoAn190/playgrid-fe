import { postRequest, getRequest } from "../utils/apiUtils";
import { Stage } from "../types/stage.type";

// Type definitions
interface LoginParams {
  email: string;
  password: string;
}

interface GoogleLoginParams {
  token: string;
  platform?: string;
  browser?: string;
  device_type?: string;
}

interface RegisterParams {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  service_code?: string;
}

interface RefreshTokenParams {
  refreshToken: string;
}

interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordParams {
  email: string;
}

interface VerifyResetTokenParams {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

interface UpdateProfileParams {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: File;
}

const AuthHandler = {
  login: async (params: LoginParams): Promise<Stage<any>> => {
    return postRequest<any>("/api/auth/login", params);
  },

  googleLogin: async (params: GoogleLoginParams): Promise<Stage<any>> => {
    return postRequest<any>("/api/auth/google-login", params);
  },

  register: async (params: RegisterParams): Promise<Stage<any>> => {
    return postRequest<any>("/api/auth/register", params);
  },

  logout: async (): Promise<Stage<any>> => {
    return postRequest("/api/auth/logout", {});
  },

  refreshToken: async (
    params: RefreshTokenParams
  ): Promise<Stage<any>> => {
    return postRequest<any>("/api/auth/refresh-token", params);
  },

  changePassword: async (params: ChangePasswordParams): Promise<Stage<any>> => {
    return postRequest("/api/auth/password/change", params);
  },

  forgotPassword: async (params: ResetPasswordParams): Promise<Stage<any>> => {
    return postRequest("/api/auth/password/forgot", params);
  },

  resetPassword: async (
    params: VerifyResetTokenParams
  ): Promise<Stage<any>> => {
    return postRequest("/api/auth/password/reset", params);
  },

  verifyEmail: async (token: string): Promise<Stage<any>> => {
    return postRequest("/api/auth/email/verify", { token });
  },

  resendVerificationEmail: async (email: string): Promise<Stage<any>> => {
    return postRequest("/api/auth/email/resend", { email });
  },

  getProfile: async (): Promise<Stage<any>> => {
    return getRequest("/api/auth/me");
  },

  updateProfile: async (params: UpdateProfileParams): Promise<Stage<any>> => {
    if (params.avatar) {
      const formData = new FormData();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      return postRequest("/api/auth/update-profile", formData);
    }

    return postRequest("/api/auth/update-profile", params);
  },

  validateToken: async (token: string): Promise<Stage<any>> => {
    return postRequest("/api/auth/validate", { token });
  },

  deleteAccount: async (password: string): Promise<Stage<any>> => {
    return postRequest("/api/auth/delete-account", { password });
  },
};

export default AuthHandler;
