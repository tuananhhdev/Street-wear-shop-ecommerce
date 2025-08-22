import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonUserTableProps {
    rows?: number;
    showHeader?: boolean;
}

const SkeletonUserTable = ({ rows = 10, showHeader = true }: SkeletonUserTableProps) => {
    // Random width variations for realistic effect
    const getRandomWidth = (min: number, max: number) => {
        return `${Math.floor(Math.random() * (max - min + 1) + min)}%`;
    };

    return (
        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
            <Table>
                {showHeader && (
                    <TableHeader>
                        <TableRow className="bg-muted/50 border-b border-gray-200">
                            <TableHead className="w-[100px] h-12 font-semibold text-gray-700">
                                <Skeleton className="h-4 w-12 rounded-md bg-gray-200/80" />
                            </TableHead>
                            <TableHead className="w-[150px] font-semibold text-gray-700">
                                <Skeleton className="h-4 w-16 rounded-md bg-gray-200/80" />
                            </TableHead>
                            <TableHead className="w-[200px] font-semibold text-gray-700">
                                <Skeleton className="h-4 w-20 rounded-md bg-gray-200/80" />
                            </TableHead>
                            <TableHead className="w-[100px] font-semibold text-gray-700">
                                <Skeleton className="h-4 w-14 rounded-md bg-gray-200/80" />
                            </TableHead>
                            <TableHead className="w-[150px] font-semibold text-gray-700">
                                <Skeleton className="h-4 w-24 rounded-md bg-gray-200/80" />
                            </TableHead>
                            <TableHead className="w-[100px] font-semibold text-gray-700">
                                <Skeleton className="h-4 w-16 rounded-md bg-gray-200/80" />
                            </TableHead>
                            <TableHead className="text-right w-[100px] font-semibold text-gray-700">
                                <div className="flex justify-end">
                                    <Skeleton className="h-4 w-20 rounded-md bg-gray-200/80" />
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                )}
                <TableBody>
                    {[...Array(rows)].map((_, index) => (
                        <TableRow
                            key={index}
                            className="hover:bg-muted/50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                        >
                            {/* ID Column */}
                            <TableCell className="py-4">
                                <Skeleton className="h-4 w-full rounded-md bg-gray-200/80" />
                            </TableCell>
                            {/* Name Column */}
                            <TableCell className="py-4">
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="h-8 w-8 rounded-full bg-gray-200/80" />
                                    <div className="space-y-2">
                                        <Skeleton
                                            className="h-4 rounded-md bg-gray-200/80"
                                            style={{ width: getRandomWidth(60, 90) }}
                                        />
                                        <Skeleton
                                            className="h-3 rounded-md bg-gray-200/80 opacity-60"
                                            style={{ width: getRandomWidth(40, 70) }}
                                        />
                                    </div>
                                </div>
                            </TableCell>
                            {/* Email Column */}
                            <TableCell className="py-4">
                                <Skeleton
                                    className="h-4 rounded-md bg-gray-200/80"
                                    style={{ width: getRandomWidth(70, 95) }}
                                />
                            </TableCell>
                            {/* Gender Column */}
                            <TableCell className="py-4">
                                <Skeleton className="h-6 w-16 rounded-full bg-gray-200/80" />
                            </TableCell>
                            {/* Phone Column */}
                            <TableCell className="py-4">
                                <Skeleton
                                    className="h-4 rounded-md bg-gray-200/80"
                                    style={{ width: getRandomWidth(60, 85) }}
                                />
                            </TableCell>
                            {/* Role Column */}
                            <TableCell className="py-4">
                                <Skeleton className="h-6 w-20 rounded-full bg-gray-200/80" />
                            </TableCell>
                            {/* Actions Column */}
                            <TableCell className="text-right py-4">
                                <div className="flex justify-end items-center space-x-2">
                                    <Skeleton className="h-8 w-8 rounded-md bg-gray-200/80" />
                                    <Skeleton className="h-8 w-8 rounded-md bg-gray-200/80" />
                                    <Skeleton className="h-8 w-8 rounded-md bg-gray-200/80" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Loading indicator */}
            <div className="flex items-center justify-center py-4 bg-gray-50/30">
                <div className="flex items-center space-x-3 text-gray-500">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    </div>
                    <span className="text-sm font-medium">Đang tải dữ liệu...</span>
                </div>
            </div>
        </div>
    );
};

export default SkeletonUserTable;