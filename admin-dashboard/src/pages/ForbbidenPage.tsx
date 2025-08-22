import { Button } from '@/components/ui/button';
import { ShieldAlert, Home, ArrowLeft, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#242424] to-[#1a1a1a]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.01)_50%,transparent_75%)]" />

      <div
        className={`relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="w-full max-w-md space-y-8 text-center">
          {/* Icon with background glow */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center group">
            <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl transition-all duration-500 group-hover:bg-red-500/40" />
            <div className="relative rounded-full bg-red-950/80 border border-red-800/50 p-6 transition-all duration-300 hover:scale-110 hover:rotate-6 animate-bounce-in">
              <ShieldAlert className="h-12 w-12 text-red-400" />
            </div>
          </div>

          {/* Error code */}
          <div className="space-y-2 animate-fade-in-up animation-delay-200">
            <h1 className="text-6xl font-bold md:text-7xl bg-gradient-to-br from-red-400 to-orange-400 bg-clip-text text-transparent">
              403
            </h1>
            <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 animate-width-expand" />
          </div>

          {/* Main heading */}
          <h2 className="text-2xl font-bold text-white sm:text-3xl animate-fade-in-up animation-delay-300">
            Không có quyền truy cập
          </h2>

          {/* Description */}
          <p className="text-base text-gray-300 sm:text-lg animate-fade-in-up animation-delay-400">
            Tài khoản của bạn không đủ quyền để truy cập vào khu vực admin này. Vui lòng liên hệ với
            quản trị viên để được cấp quyền.
          </p>

          {/* Additional info card */}
          <div className="rounded-lg border border-gray-700/50 bg-[#242424]/80 backdrop-blur-sm p-4 animate-fade-in-up animation-delay-500 hover:bg-[#2a2a2a]/80 transition-colors duration-300">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Lock className="h-4 w-4" />
              <span>Khu vực này chỉ dành cho quản trị viên</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center animate-fade-in-up animation-delay-600">
            <Button
              onClick={handleNavigateHome}
              className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-2 text-white hover:from-blue-700 hover:to-blue-800 sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Home className="h-4 w-4" />
              Về trang chủ
            </Button>

            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full gap-2 px-6 py-2 sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </div>

          {/* Help text */}
          <p className="text-xs text-slate-500 dark:text-slate-500 animate-fade-in-up animation-delay-700">
            Cần hỗ trợ?{' '}
            <button
              onClick={() => (window.location.href = 'mailto:admin@yoursite.com')}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 hover:underline"
            >
              Liên hệ quản trị viên
            </button>
          </p>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute right-10 top-20 hidden h-16 w-16 rounded-full bg-gradient-to-br from-red-400/20 to-orange-400/20 blur-sm lg:block animate-float" />
        <div className="absolute bottom-32 left-10 hidden h-12 w-12 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-sm lg:block animate-float-reverse" />
      </div>

      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0) rotate(-180deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(-90deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes width-expand {
          from { width: 0; }
          to { width: 4rem; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(-10px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(5deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(10px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-width-expand {
          animation: width-expand 1s ease-out 0.5s forwards;
          width: 0;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite 1s;
        }
        
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-500 { animation-delay: 0.5s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
        .animation-delay-700 { animation-delay: 0.7s; opacity: 0; }
      `}</style>
    </div>
  );
}
