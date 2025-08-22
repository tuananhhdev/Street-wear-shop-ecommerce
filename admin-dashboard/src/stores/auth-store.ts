import { tokenStorage } from '@/lib/axios-client';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import type { IUser } from '@/types/api';
import { toast } from 'sonner';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ILoginCredentials {
  email: string;
  password: string;
}

interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (credentials: ILoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getCurrentUser: () => Promise<IUser | null>;
  clearAuth: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,

        login: async (credentials: ILoginCredentials) => {
          try {
            set({ isLoading: true });

            const response = await authService.login(credentials);
            const { accessToken, refreshToken } = response.data

            tokenStorage.setAccess(accessToken);
            tokenStorage.setRefresh(refreshToken);

            set({
              isAuthenticated: true,
              isLoading: false
            });

            const userRes = await userService.getProfile()

            set({ user: userRes.data })



          } catch (error: any) {
            set({ isLoading: false });
            const message = error.response?.data?.message || 'Đăng nhập thất bại';
            toast.error(Array.isArray(message) ? message[0] : message);
            throw error;
          }
        },

        logout: async () => {
          try {
            await authService.logout();
            get().clearAuth();
            toast.success('Đăng xuất thành công');
          } catch (error: any) {
            console.error('Logout error:', error);
            get().clearAuth();
            toast.success('Đăng xuất thành công');
          } finally {
            window.location.href = '/auth/login';
          }
        },

        refreshToken: async () => {
          try {
            const accessToken = tokenStorage.getAccess();
            const refreshToken = tokenStorage.getRefresh();

            if (!accessToken || !refreshToken) {
              throw new Error('Không tìm thấy token');
            }

            const response = await authService.refreshToken({
              accessToken,
              refreshToken,
            });

            const newAccessToken = response.data.data.accessToken;
            tokenStorage.setAccess(newAccessToken);
          } catch (error: any) {
            console.error('Làm mới token lỗi:', error);
            get().clearAuth();
          }
        },

        getCurrentUser: async () => {
          try {
            if (!authService.isAuthenticated()) {
              return null;
            }

            const response = await userService.getProfile();
            const user = response.data.data;

            set({
              user,
              isAuthenticated: true,
            });
            return user;
          } catch (error) {
            console.error('Lấy người dùng hiện tại lỗi:', error);
            get().clearAuth();
            return null;
          }
        },

        checkAuth: async () => {
          const accessToken = tokenStorage.getAccess();
          if (!accessToken) {
            set({ user: null, isAuthenticated: false });
            return;
          }

          set({ isLoading: true });
          try {
            const profile = await userService.getProfile();
            set({ user: profile, isAuthenticated: true, isLoading: false });
          } catch (err) {
            tokenStorage.clearAll();
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        },


        clearAuth: () => {
          tokenStorage.clearAll();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);

export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useCheckAuth = () => useAuthStore((state) => state.checkAuth);
export const useClearAuth = () => useAuthStore((state) => state.clearAuth);
export const useRefreshToken = () => useAuthStore((state) => state.refreshToken);
export const useGetCurrentUser = () => useAuthStore((state) => state.getCurrentUser);
