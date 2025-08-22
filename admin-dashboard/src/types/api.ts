
export interface IApiResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data: T;
  docs?: string;
  timestamp?: string;
}

export interface IPagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

export interface IBaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IBaseEntity {
  fullName: string;
  email: string;
  avatar?: string;
  phone?: string;
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


export interface IApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp?: string;
  path?: string;
}
