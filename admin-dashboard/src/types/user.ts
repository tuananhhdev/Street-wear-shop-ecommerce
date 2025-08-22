import type { IPagination } from "./api";

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  isActive: boolean;
  roleId?: {
    _id: string;
    name: string;
  }
  role?: string;
  permissions?: Array<{
    _id: string;
    name: string;
    key: string;
    isActive: boolean;
  }>;
}

export type Gender = 'male' | 'female';

export interface IUserQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  role?: string;
  gender?: Gender
}

export interface IUserListResponse {
  items: IUser[];
  pagination: IPagination;
}