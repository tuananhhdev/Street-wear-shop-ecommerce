import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL environment variable is required");
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const tokenStorage = {
  getAccess: () => localStorage.getItem("access_token"),
  setAccess: (token: string) => localStorage.setItem("access_token", token),
  removeAccess: () => localStorage.removeItem("access_token"),

  getRefresh: () => localStorage.getItem("refresh_token"),
  setRefresh: (token: string) => localStorage.setItem("refresh_token", token),
  removeRefresh: () => localStorage.removeItem("refresh_token"),

  clearAll: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const addRefreshSubscriber = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccess();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (import.meta.env.DEV) {
      console.log(
        `✅ ${response.status} ${response.config.url}`,
        response.data
      );
    }

    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    console.error("❌ API Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data || error.message,
    });

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            resolve(axiosClient(originalRequest));
          });
        });
      }

      isRefreshing = true;
      const refreshToken = tokenStorage.getRefresh();

      if (!refreshToken) {
        tokenStorage.clearAll();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await refreshClient.post("/auth/refresh-token", {
          refreshToken,
          accessToken: tokenStorage.getAccess(),
        });

        const newAccessToken = response.data?.data?.accessToken;

        if (newAccessToken) {
          tokenStorage.setAccess(newAccessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          onTokenRefreshed(newAccessToken);
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("❌ Token refresh failed:", refreshError);
        tokenStorage.clearAll();
        window.location.href = "/login";
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
