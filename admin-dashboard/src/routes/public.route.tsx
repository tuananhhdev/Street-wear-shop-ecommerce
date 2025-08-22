import ForbiddenPage from '@/pages/ForbbidenPage';
import LoginPage from '@/pages/LoginPage';
import type { IAppRoute } from '@/types/route';

export const PublicRoutes: IAppRoute[] = [
  {
    path: '/login',
    element: <LoginPage />,
    title: 'Đăng Nhập - Admin Dashboard',
  },
  {
    path: '/forbidden',
    element: <ForbiddenPage />,
    title: 'Truy cập bị cấm - Admin Dashboard',
  },
];
