import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Eye, EyeOff, Loader2, ShoppingBag, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { useIsAuthenticated, useLogin } from '@/stores/auth-store';
import { Checkbox } from '@/components/ui/checkbox';
import { loginSchema, type LoginFormData } from '@/validators/login-schema';

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const login = useLogin();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        setValue,
    } = form;

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setValue('email', rememberedEmail);
            setValue('rememberMe', true);
        }
    }, [setValue]);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login({
                email: data.email,
                password: data.password,
            });

            setLoginSuccess(true);

            if (data.rememberMe) {
                localStorage.setItem('rememberedEmail', data.email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            toast.success('Đăng nhập thành công!');

            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1200);
        } catch (error: any) {
            setLoginSuccess(false);
            toast.error(error.message || 'Đăng nhập thất bại!');
            setTimeout(() => {
                form.setFocus('email');
            }, 100);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-lg">
                    {/* Logo/Brand Section */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
                            <ShoppingBag className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Streetwear Admin</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Hệ thống quản trị thời trang streetwear
                        </p>
                    </div>

                    {/* Login Card */}
                    <Card className="border shadow-2xl bg-white dark:bg-gray-900">
                        <CardHeader className="space-y-1 pb-8">
                            <div className="flex items-center justify-center mb-4">
                                <Shield className="h-8 w-8 text-primary mr-2" />
                                <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
                            </div>
                            <CardDescription className="text-center text-base">
                                Vui lòng đăng nhập để truy cập vào bảng điều khiển quản trị
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="px-8">
                            <Form {...form}>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Email Field */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Địa chỉ Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder="Nhập địa chỉ email của bạn"
                                                        disabled={isSubmitting}
                                                        className="h-12 px-4 text-base"
                                                        required
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Password Field */}
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mật khẩu</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            {...field}
                                                            type={showPassword ? 'text' : 'password'}
                                                            placeholder="Nhập mật khẩu của bạn"
                                                            disabled={isSubmitting}
                                                            className="h-12 px-4 pr-12 text-base"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            disabled={isSubmitting}
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                                            ) : (
                                                                <Eye className="h-5 w-5 text-gray-400" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between">
                                        <FormField
                                            control={form.control}
                                            name="rememberMe"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center space-x-2 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            disabled={isSubmitting}
                                                            className="border-2 border-gray-300 dark:border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                                                        Ghi nhớ email
                                                    </FormLabel>
                                                </FormItem>
                                            )}
                                        />

                                        <button
                                            type="button"
                                            className="group relative text-sm text-primary font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-sm px-1 py-0.5"
                                            disabled={isSubmitting}
                                        >
                                            <span className="relative z-10 group-hover:text-primary/90 transition-colors duration-200">
                                                Quên mật khẩu?
                                            </span>
                                            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 ease-out group-hover:w-full"></span>
                                        </button>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className={`group relative h-12 w-full text-base font-medium overflow-hidden transition-all duration-500 transform shadow-lg hover:shadow-xl cursor-pointer ${loginSuccess
                                            ? 'bg-green-500 scale-105 shadow-2xl'
                                            : 'bg-primary hover:bg-primary/90 hover:scale-[1.02] hover:-translate-y-0.5'
                                            } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                                        disabled={isSubmitting}
                                    >
                                        {/* Background effects */}
                                        <div className={`absolute inset-0 transition-all duration-500 ${loginSuccess
                                            ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                                            : 'bg-gradient-to-r from-primary via-primary to-primary/80 opacity-0 group-hover:opacity-100'
                                            }`} />

                                        {/* Shimmer effect */}
                                        {!loginSuccess && (
                                            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                                        )}

                                        {/* Success particles */}
                                        {loginSuccess && (
                                            <div className="absolute inset-0">
                                                {[...Array(6)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                                                        style={{
                                                            left: `${20 + i * 10}%`,
                                                            top: `${30 + (i % 2) * 40}%`,
                                                            animationDelay: `${i * 100}ms`,
                                                            animationDuration: '1s'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="relative z-10 flex items-center justify-center">
                                            {loginSuccess ? (
                                                <>
                                                    <svg className="w-6 h-6 mr-2 animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="font-semibold animate-pulse">Đăng nhập thành công!</span>
                                                </>
                                            ) : isSubmitting ? (
                                                <>
                                                    <div className="relative mr-3">
                                                        <Loader2 className="h-5 w-5 animate-spin" />
                                                        <div className="absolute inset-0 h-5 w-5 border-2 border-transparent border-t-white/30 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }} />
                                                    </div>
                                                    <span className="animate-pulse">Đang đăng nhập</span>
                                                    <div className="ml-1 flex space-x-1">
                                                        <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                        <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                        <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                    </div>
                                                </>
                                            ) : (
                                                <>

                                                    <span className="transition-all duration-200 group-hover:tracking-wide ">
                                                        Đăng nhập
                                                    </span>
                                                    <div className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Click ripple */}
                                        <div className="absolute inset-0 opacity-0 group-active:opacity-20 bg-white rounded-md transition-opacity duration-150" />
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
