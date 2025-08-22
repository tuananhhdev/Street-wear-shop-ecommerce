import { Skeleton } from "@/components/ui/skeleton";

export default function AppSkeleton() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r p-4 hidden md:block">
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-10 w-32 rounded-md" />
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-6 w-36" />
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-6 w-44" />
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-40 w-full rounded-xl" />
                    <Skeleton className="h-40 w-full rounded-xl" />
                </div>
            </main>
        </div>
    );
}
