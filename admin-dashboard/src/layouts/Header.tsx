import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useTheme } from '@/providers/theme-provider';
import { useUser } from '@/stores/auth-store';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  Command,
  HelpCircle,
  Laptop,
  LogOut,
  Moon,
  Search,
  Settings,
  Shield,
  Sun,
  User,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const user = useUser();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, resolvedTheme, setTheme } = useTheme();

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Đơn hàng mới',
      message: 'Bạn có 3 đơn hàng mới cần xử lý',
      time: '2 phút trước',
      type: 'order',
      unread: true,
    },
    {
      id: 2,
      title: 'Người dùng mới',
      message: '5 người dùng vừa đăng ký tài khoản',
      time: '15 phút trước',
      type: 'user',
      unread: true,
    },
    {
      id: 3,
      title: 'Báo cáo tuần',
      message: 'Báo cáo doanh thu tuần này đã sẵn sàng',
      time: '1 giờ trước',
      type: 'report',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (profileRef.current && !(profileRef.current as HTMLElement).contains(target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !(notificationRef.current as HTMLElement).contains(target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.1,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const renderIcon = () => {
    if (theme === 'system') return <Laptop className="h-5 w-5" />;
    if (resolvedTheme === 'light') return <Sun className="h-5 w-5" />;
    return <Moon className="h-5 w-5" />;
  };

  type NotificationType = 'order' | 'user' | 'report' | string;

  const getNotificationIcon = (type: NotificationType): string => {
    switch (type) {
      case 'order':
        return '🛒';
      case 'user':
        return '👤';
      case 'report':
        return '📊';
      default:
        return '🔔';
    }
  };

  return (
    <motion.header
      className="flex h-16 shrink-0 items-center gap-2 border-b bg-card/80 backdrop-blur-md px-6 sticky top-0 z-40 dark:bg-card-dark dark:border-gray-800"
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:bg-muted rounded-lg transition-colors duration-200 dark:hover:bg-muted-dark" />

        {/* Breadcrumb - Optional */}
        <div className="hidden md:flex items-center text-sm text-muted-foreground dark:text-muted-foreground-dark">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-foreground dark:text-foreground-dark font-medium">Tổng quan</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="relative w-full max-w-lg">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
            <Search className="h-4 w-4 text-muted-foreground dark:text-muted-foreground-dark" />
            <div className="hidden sm:flex items-center ml-2 text-xs text-muted-foreground dark:text-muted-foreground-dark">
              <Command className="h-3 w-3 mr-1" />
              <span>K</span>
            </div>
          </div>
          <motion.input
            type="search"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-background dark:focus:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 dark:border-input-dark dark:bg-background-dark dark:placeholder:text-muted-foreground-dark"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 w-full bg-card rounded-xl border border-input shadow-lg z-50 dark:bg-card-dark dark:border-input-dark"
            >
              <div className="p-4">
                <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
                  Đang tìm kiếm "{searchQuery}"...
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="dark:bg-muted-dark dark:hover:bg-muted-dark/80">
              {renderIcon()}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card dark:bg-card-dark">
            <DropdownMenuItem
              onClick={() => setTheme('light')}
              className="text-foreground dark:text-foreground-dark hover:bg-accent dark:hover:bg-accent-dark"
            >
              <Sun className="mr-2 h-4 w-4" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme('dark')}
              className="text-foreground dark:text-foreground-dark hover:bg-accent dark:hover:bg-accent-dark"
            >
              <Moon className="mr-2 h-4 w-4" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme('system')}
              className="text-foreground dark:text-foreground-dark hover:bg-accent dark:hover:bg-accent-dark"
            >
              <Laptop className="mr-2 h-4 w-4" /> System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <motion.button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-card text-foreground hover:bg-muted transition-all duration-200 dark:border-input-dark dark:bg-card-dark dark:text-foreground-dark dark:hover:bg-muted-dark"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white dark:bg-red-400"
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute right-0 mt-2 w-80 bg-card rounded-xl border border-input shadow-lg z-50 dark:bg-card-dark dark:border-input-dark"
              >
                <div className="p-4 border-b border-input dark:border-input-dark">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground dark:text-foreground-dark">Thông báo</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full dark:bg-red-900/30 dark:text-red-400">
                        {unreadCount} mới
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      className={`p-4 border-b border-input dark:border-input-dark hover:bg-muted dark:hover:bg-muted-dark transition-colors duration-200 ${notification.unread ? 'bg-blue-50/30 dark:bg-blue-900/20' : ''}`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-lg">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground dark:text-foreground-dark">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground-dark mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground dark:text-muted-foreground-dark mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 dark:bg-blue-400"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="p-4 border-t border-input dark:border-input-dark">
                  <button className="w-full text-center text-sm text-primary dark:text-primary-dark hover:underline">
                    Xem tất cả thông báo
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <motion.button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-1.5 hover:bg-muted transition-all duration-200 dark:border-input-dark dark:bg-card-dark dark:hover:bg-muted-dark"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <span className="text-xs font-semibold text-white">
                {user?.fullName?.split(' ').map((n) => n[0]).join('') || 'U'}
              </span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-foreground dark:text-foreground-dark">
                {user?.fullName || 'User'}
              </div>
              <div className="text-xs text-muted-foreground dark:text-muted-foreground-dark">
                {user?.role || 'Member'}
              </div>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 dark:text-muted-foreground-dark ${isProfileOpen ? 'rotate-180' : ''}`}
            />
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute right-0 mt-2 w-64 bg-card rounded-xl border border-input shadow-xl z-50 dark:bg-card-dark dark:border-input-dark"
              >
                <div className="p-4 border-b border-input dark:border-input-dark">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <span className="text-sm font-semibold text-white">
                        {user?.fullName?.split(' ').map((n) => n[0]).join('') || 'U'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground dark:text-foreground-dark truncate">
                        {user?.fullName || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground-dark truncate">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  {[
                    { icon: User, label: 'Hồ sơ cá nhân', href: '/profile' },
                    { icon: Settings, label: 'Cài đặt', href: '/settings' },
                    { icon: Shield, label: 'Bảo mật', href: '/security' },
                    { icon: HelpCircle, label: 'Trợ giúp', href: '/help' },
                  ].map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm text-foreground dark:text-foreground-dark hover:bg-muted dark:hover:bg-muted-dark transition-colors duration-200"
                      whileHover={{ x: 4 }}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </motion.a>
                  ))}
                </div>

                <div className="p-2 border-t border-input dark:border-input-dark">
                  <motion.button
                    className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                    whileHover={{ x: 4 }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Đăng xuất</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;