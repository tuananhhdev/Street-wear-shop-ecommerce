export interface IApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface IBaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IBaseEntity {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  isActive: boolean;
  roleId?: string;
  role?: {
    _id: string;
    name: string;
  };
  permissions?: Array<{
    _id: string;
    name: string;
    key: string;
    isActive: boolean;
  }>;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
}

export interface ICategory extends IBaseEntity {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}

export interface ICreateCategoryDto {
  name: string;
  description?: string;
}

export interface IPermission extends IBaseEntity {
  name: string;
  key: string;
  description?: string;
  isActive: boolean;
}

export interface ICreatePermissionDto {
  name: string;
  key: string;
  description?: string;
}

export interface IRole extends IBaseEntity {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ICreateRoleDto {
  name: string;
  description?: string;
}

export interface IPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IPaginatedResponse<T> {
  items: T[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface IApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp?: string;
  path?: string;
}
