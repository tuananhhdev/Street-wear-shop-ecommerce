import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { useCheckAuth, useIsLoading } from './stores/auth-store';
import { useEffect } from 'react';

function App() {
  const checkAuth = useCheckAuth();
  const isLoading = useIsLoading();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Đang khởi tạo...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
