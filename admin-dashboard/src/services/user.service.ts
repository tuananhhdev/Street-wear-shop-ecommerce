import axiosClient from '@/lib/axios-client';
import type { IApiResponse, IUser } from '@/types/api';
import type { IUserListResponse, IUserQuery } from '@/types/user';

export const userService = {
  getUsers: async (params?: IUserQuery): Promise<IUserListResponse> => {
    const res = await axiosClient.get('/users', { params });
    return res.data;
  },

  getUserById: async (id: string): Promise<IUser> => {
    const res = await axiosClient.get<IApiResponse<IUser>>(`/users/${id}`);
    return res.data.data;
  },

  createUser: async (data: Partial<IUser>): Promise<IUser> => {
    const res = await axiosClient.post<IApiResponse<IUser>>('/users', data);
    return res.data.data;
  },

  updateUser: async (id: string, data: Partial<IUser>): Promise<IUser> => {
    const res = await axiosClient.put<IApiResponse<IUser>>(`/user/${id}`, data);
    return res.data.data;
  },

  updateProfile: async (data: Partial<IUser>): Promise<IUser> => {
    const res = await axiosClient.patch<IApiResponse<IUser>>('/users', data);
    return res.data.data;
  },

  softDeleteUser: async (id: string, userId: string): Promise<IUser> => {
    const res = await axiosClient.delete<IApiResponse<IUser>>(`/users/${id}`, {
      data: { userId },
    });
    return res.data.data;
  },

  getProfile: async (): Promise<IUser> => {
    const res = await axiosClient.get<IApiResponse<IUser>>('/users/profile');
    return res.data.data;
  },
};
