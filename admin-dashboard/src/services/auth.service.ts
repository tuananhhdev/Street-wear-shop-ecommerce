import axiosClient, { tokenStorage } from "@/lib/axios-client";
import type {
  IApiResponse,
  ILoginRequest,
  ILoginResponse,
  IRefreshTokenRequest,
  IRefreshTokenResponse,
} from "@/types/api";

export const authService = {
  login: (payload: ILoginRequest) =>
    axiosClient.post<IApiResponse<ILoginResponse>>("/auth/login", payload),

  refreshToken: (payload: IRefreshTokenRequest) =>
    axiosClient.post<IApiResponse<IRefreshTokenResponse>>(
      "/auth/refresh-token",
      payload
    ),

  logout: () => {
    tokenStorage.clearAll();
    window.location.href = "/login";
  },

  isAuthenticated: (): boolean => {
    const accessToken = tokenStorage.getAccess();
    const refreshToken = tokenStorage.getRefresh();
    return !!(accessToken && refreshToken);
  },

  ping: () => axiosClient.get("/"),
};
