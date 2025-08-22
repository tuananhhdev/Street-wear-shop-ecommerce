import { Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './public.route';
import MainLayout from '@/layouts/MainLayout';
import ProtectRoutesWrapper from './protect-route';
import { ProtectRoutes } from './protect.route';
import type { IAppRoute } from '@/types/route';

const renderRoutes = (routes: IAppRoute[]) =>
  routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return (
      <Route
        key={route.path}
        path={route.path}
        index={route.index}
        element={route.element}
      />
    );
  });

const AppRoutes = () => {
  return (
    <Routes>
      {PublicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route
        path="/*"
        element={
          <ProtectRoutesWrapper>
            <MainLayout />
          </ProtectRoutesWrapper>
        }
      >
        {renderRoutes(ProtectRoutes)}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
