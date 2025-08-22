import axiosClient from '@/lib/axios-client';
import type { IRole } from '@/types/role';

export const roleService = {
    getRoles: () => axiosClient.get<{ data: IRole[] }>('/roles'),
};
