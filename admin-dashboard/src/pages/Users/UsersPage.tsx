import EmptyData from "@/components/EmptyData";
import EmptyState from "@/components/EmptyState";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SearchUser from "@/components/users/SearchUser";
import { useUser } from "@/stores/auth-store";
import type { Gender, IUser, IUserListResponse } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Edit,
    Eye,
    RefreshCw,
    Trash2,
    Users,
    Search,
    Plus,
    Download,
    Upload,
    MoreVertical,
    Phone,
    Mail,
    MapPin,
    Grid3X3,
    List
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useUsersQuery } from "@/hooks/queries/useUsersQuery";
import { userService } from "@/services/user.service";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
    const queryClient = useQueryClient();
    const authUser = useUser();

    const [page, setPage] = useState(1);
    const [pageSize] = useState(12);
    const [searchTerm, setSearchTerm] = useState("");
    const [role, setRole] = useState<string | undefined>();
    const [gender, setGender] = useState<Gender | undefined>();
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    const navigate = useNavigate();

    const { data, isLoading, error, isFetching, refetch } = useUsersQuery({
        page,
        pageSize,
        search: searchTerm,
        role,
        gender,
    });

    const users = data?.items ?? [];
    const pagination = data?.pagination ?? {
        currentPage: 1,
        itemsPerPage: pageSize,
        totalPages: 1,
        totalItems: 0,
    };

    const deleteMutation = useMutation({
        mutationFn: (id: string) => {
            if (!authUser?._id) throw new Error("Không tìm thấy id người dùng hiện tại");
            return userService.softDeleteUser(id, authUser._id);
        },
        onSuccess: () => {
            toast.success("Xóa thành công");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Xóa thất bại");
        },
    });

    const handleDelete = (id: string) => deleteMutation.mutate(id);

    const handleRefresh = async () => {
        try {
            await refetch();
            toast.success("Dữ liệu đã được làm mới");
        } catch {
            toast.error("Làm mới thất bại");
        }
    };

    const isSearching = isFetching && !!searchTerm;

    function exportToExcel(data: IUser[]) {
        const worksheet = XLSX.utils.json_to_sheet(data ?? []);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        XLSX.writeFile(workbook, "users.xlsx");
    }

    // User Grid Card - More compact
    const UserGridCard = ({ user }: { user: IUser }) => (
        <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border border-gray-200/60 bg-white">
            <CardContent className="p-4">
                {/* Header with Avatar - More compact */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2.5">
                        <div className="relative">
                            <div className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                                {user.fullName?.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-gray-900 text-sm truncate group-hover:text-gray-800 transition-colors">
                                {user.fullName}
                            </h3>
                            <Badge
                                variant={user.roleId?.name === 'Admin' ? 'destructive' : 'secondary'}
                                className="mt-1 text-xs h-5"
                            >
                                {user.roleId?.name || "Customer"}
                            </Badge>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0 hover:bg-gray-100"
                            >
                                <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem onClick={() => console.log("view", user._id)}>
                                <Eye className="h-3.5 w-3.5 mr-2 text-blue-500" />
                                Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log("edit", user._id)}>
                                <Edit className="h-3.5 w-3.5 mr-2 text-green-500" />
                                Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                        className="text-red-600 focus:text-red-700"
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                                        Xóa người dùng
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Bạn có chắc chắn muốn xóa người dùng <strong>{user.fullName}</strong>?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Xóa
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Separator className="my-3" />

                {/* Contact Info - More compact */}
                <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-600">
                        <Mail className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{user.email}</span>
                    </div>

                    {user.phoneNumber && (
                        <div className="flex items-center text-xs text-gray-600">
                            <Phone className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                            <span>{user.phoneNumber}</span>
                        </div>
                    )}

                    {user.gender && (
                        <div className="flex items-center text-xs text-gray-600">
                            <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400 flex-shrink-0" />
                            <span>{user.gender === "male" ? "Nam" : "Nữ"}</span>
                        </div>
                    )}

                    {!user.phoneNumber && !user.gender && (
                        <div className="text-xs text-gray-400 italic">
                            Chưa có thông tin bổ sung
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    // Grid View - More compact grid
    const GridView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {users.map((user: IUser) => (
                <UserGridCard key={user._id} user={user} />
            ))}
        </div>
    );

    // Table View - Responsive and mobile-optimized
    const TableView = () => (
        <>
            {/* Desktop Table */}
            <div className="hidden lg:block">
                <Card className="border border-gray-200/60 shadow-sm bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-100">
                                <TableHead className="font-medium text-gray-700 h-10">Người dùng</TableHead>
                                <TableHead className="font-medium text-gray-700 h-10">Liên hệ</TableHead>
                                <TableHead className="font-medium text-gray-700 h-10">Vai trò</TableHead>
                                <TableHead className="font-medium text-gray-700 h-10">Trạng thái</TableHead>
                                <TableHead className="text-right font-medium text-gray-700 h-10">Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user: IUser) => (
                                <TableRow key={user._id} className="hover:bg-gray-50/50 border-gray-50 h-14">
                                    <TableCell className="py-2">
                                        <div className="flex items-center space-x-2.5">
                                            <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-medium text-xs shadow-sm">
                                                {user.fullName?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 text-sm">{user.fullName}</div>
                                                <div className="text-xs text-gray-500">#{user._id.slice(-6)}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2">
                                        <div className="space-y-0.5">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                            {user.phoneNumber && (
                                                <div className="text-xs text-gray-500">{user.phoneNumber}</div>
                                            )}
                                            {user.gender && (
                                                <div className="text-xs text-gray-500">{user.gender === "male" ? "Nam" : "Nữ"}</div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-2">
                                        <Badge
                                            variant={user.roleId?.name === 'Admin' ? 'destructive' : 'secondary'}
                                            className="text-xs h-5"
                                        >
                                            {user.roleId?.name || "Customer"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-2">
                                        <div className="flex items-center space-x-1.5">
                                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                            <span className="text-xs text-green-600 font-medium">Hoạt động</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right py-2">
                                        <div className="flex justify-end space-x-1">
                                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-blue-50 hover:text-blue-600">
                                                <Eye className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-green-50 hover:text-green-600">
                                                <Edit className="h-3.5 w-3.5" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600">
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Bạn có chắc chắn muốn xóa người dùng <strong>{user.fullName}</strong>?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(user._id)}
                                                            className="bg-red-600 hover:bg-red-700"
                                                        >
                                                            Xóa
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>

            {/* Mobile/Tablet List */}
            <div className="lg:hidden space-y-3">
                {users.map((user: IUser) => (
                    <Card key={user._id} className="border border-gray-200/60 shadow-sm bg-white">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
                                            {user.fullName?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 text-sm truncate">
                                            {user.fullName}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                                variant={user.roleId?.name === 'Admin' ? 'destructive' : 'secondary'}
                                                className="text-xs h-5"
                                            >
                                                {user.roleId?.name || "Customer"}
                                            </Badge>
                                            <div className="flex items-center space-x-1">
                                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                                                <span className="text-xs text-green-600 font-medium">Hoạt động</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-gray-100"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem onClick={() => console.log("view", user._id)}>
                                            <Eye className="h-4 w-4 mr-2 text-blue-500" />
                                            Xem chi tiết
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => console.log("edit", user._id)}>
                                            <Edit className="h-4 w-4 mr-2 text-green-500" />
                                            Chỉnh sửa
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-700"
                                                    onSelect={(e) => e.preventDefault()}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Xóa người dùng
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Bạn có chắc chắn muốn xóa người dùng <strong>{user.fullName}</strong>?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDelete(user._id)}
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        Xóa
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <Separator className="my-3" />

                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <Mail className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </div>

                                {user.phoneNumber && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Phone className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                                        <span>{user.phoneNumber}</span>
                                    </div>
                                )}

                                {user.gender && (
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 mr-3 text-gray-400 flex-shrink-0" />
                                        <span>{user.gender === "male" ? "Nam" : "Nữ"}</span>
                                    </div>
                                )}

                                {!user.phoneNumber && !user.gender && (
                                    <div className="text-sm text-gray-400 italic">
                                        Chưa có thông tin bổ sung
                                    </div>
                                )}

                                <div className="pt-2 border-t border-gray-100">
                                    <div className="text-xs text-gray-500">
                                        ID: #{user._id.slice(-8)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );

    // Loading Skeletons - More compact
    const GridSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
                <Card key={i} className="border border-gray-200/60 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2.5 mb-3">
                            <Skeleton className="w-9 h-9 rounded-full" />
                            <div className="space-y-1.5">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-3 w-14" />
                            </div>
                        </div>
                        <Separator className="my-3" />
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    // Empty State - More compact
    const EmptyStateComponent = () => (
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "Không tìm thấy người dùng" : "Chưa có người dùng"}
            </h3>
            <p className="text-gray-500 mb-4 max-w-sm mx-auto text-sm">
                {searchTerm
                    ? "Thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác"
                    : "Bắt đầu bằng cách thêm người dùng đầu tiên vào hệ thống"
                }
            </p>
            {!searchTerm && (
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm người dùng
                </Button>
            )}
        </div>
    );

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-7xl mx-auto">
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="p-6 text-center">
                            <div className="text-red-600 font-medium mb-4">Có lỗi xảy ra khi tải dữ liệu</div>
                            <Button onClick={handleRefresh} variant="outline">
                                Thử lại
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4">
                {/* Header - More compact */}
                <div className="mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                Quản lý người dùng
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Quản lý thông tin và quyền hạn của người dùng trong hệ thống
                            </p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => exportToExcel(users)}
                                className="h-9"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Xuất Excel
                            </Button>
                            <Button 
                                className="bg-gray-900 hover:bg-gray-800 text-white h-9" 
                                onClick={() => navigate('/users/add')}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Thêm mới
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Controls - Fixed alignment issues */}
                <div className="bg-white rounded-lg p-4 sm:p-3 shadow-sm border border-gray-200/60 mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 lg:gap-3">
                        {/* Search Bar - Override component styles */}
                        <div className="flex-1 w-full">
                            <div className="relative w-full">
                                <SearchUser
                                    value={searchTerm}
                                    onChange={setSearchTerm}
                                    className="!mb-0 !max-w-none !w-full"
                                />
                            </div>
                        </div>

                        {/* Controls - All properly aligned */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1.5 lg:gap-2 flex-shrink-0">
                            <Select onValueChange={(val) => setRole(val === "all" ? undefined : val)} defaultValue="all">
                                <SelectTrigger className="w-full sm:w-28 h-11 text-sm">
                                    <SelectValue placeholder="Vai trò" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Customer">Customer</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(val) => setGender(val === "all" ? undefined : val as Gender)} defaultValue="all">
                                <SelectTrigger className="w-full sm:w-28 h-11 text-sm">
                                    <SelectValue placeholder="Giới tính" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả</SelectItem>
                                    <SelectItem value="male">Nam</SelectItem>
                                    <SelectItem value="female">Nữ</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex bg-gray-900 rounded-lg p-1.5 h-11 items-center gap-0.5">
                                <Button
                                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className={`h-8 w-10 p-0 ${
                                        viewMode === 'grid' 
                                            ? 'bg-white text-gray-900 hover:bg-gray-100' 
                                            : 'text-white hover:bg-gray-700'
                                    }`}
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('table')}
                                    className={`h-8 w-10 p-0 ${
                                        viewMode === 'table' 
                                            ? 'bg-white text-gray-900 hover:bg-gray-100' 
                                            : 'text-white hover:bg-gray-700'
                                    }`}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRefresh}
                                disabled={isFetching}
                                className="h-11 w-11 p-0"
                            >
                                <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {(isSearching || isLoading) ? (
                    <GridSkeleton />
                ) : users.length > 0 ? (
                    viewMode === 'grid' ? <GridView /> : <TableView />
                ) : (
                    <EmptyStateComponent />
                )}

                {/* Pagination - More compact */}
                {pagination.totalPages > 1 && !isSearching && !isLoading && (
                    <div className="flex items-center justify-between mt-6 bg-white rounded-lg p-4 shadow-sm border border-gray-200/60">
                        <div className="text-sm text-gray-600">
                            Hiển thị {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}-{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
                            {' '}của {pagination.totalItems} kết quả
                        </div>

                        <div className="flex items-center space-x-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={pagination.currentPage === 1}
                                className="h-8"
                            >
                                Trước
                            </Button>

                            <div className="flex items-center space-x-1">
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    const pageNumber = i + 1;
                                    return (
                                        <Button
                                            key={pageNumber}
                                            variant={pageNumber === pagination.currentPage ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setPage(pageNumber)}
                                            className="w-8 h-8 p-0 text-sm"
                                        >
                                            {pageNumber}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                                disabled={pagination.currentPage === pagination.totalPages}
                                className="h-8"
                            >
                                Sau
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersPage;