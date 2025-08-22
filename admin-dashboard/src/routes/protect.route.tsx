import DashboardPage from '@/pages/DashboardPage';
import AddUser from '@/pages/Users/AddUser';
import UsersPage from '@/pages/Users/UsersPage';
import type { IAppRoute } from '@/types/route';

export const ProtectRoutes: IAppRoute[] = [
  {
    index: true,
    element: <DashboardPage />,
    title: 'Dashboard - Admin Dashboard',
  },
  {
    path: 'users',
    title: 'Users - Admin Dashboard',
    children: [
      {
        index: true,
        element: <UsersPage />,
        title: 'Add User - Admin Dashboard',
      },
      {
        path: 'add',
        element: <AddUser />,
        title: 'Add User - Admin Dashboard',
      },
    ]
  }
];
