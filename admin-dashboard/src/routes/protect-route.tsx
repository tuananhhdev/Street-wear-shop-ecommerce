import { useIsAuthenticated, useIsLoading } from '@/stores/auth-store';
import { Loader2 } from 'lucide-react';
import type React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IProtectRoutesWrapper {
  children: React.ReactNode;
}

const ProtectRoutesWrapper = ({ children }: IProtectRoutesWrapper) => {
  const isAuthenticated = useIsAuthenticated();
  const isLoading = useIsLoading();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [isLoading, isAuthenticated, navigate, location]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectRoutesWrapper;
