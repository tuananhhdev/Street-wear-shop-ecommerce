import { roleService } from "@/services/role.service";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { IRole } from "@/types/role";

interface FilterRolesProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    roleFilter: string; // "all" hoặc roleId
    onRoleChange: (value: string) => void;
}

const FilterRoles: React.FC<FilterRolesProps> = ({
    searchTerm,
    onSearchChange,
    roleFilter,
    onRoleChange,
}) => {
    const { data: roles = [] } = useQuery<IRole[]>({
        queryKey: ["roles"],
        queryFn: async () => {
            const res = await roleService.getRoles();
            if (Array.isArray(res)) {
                return res;
            }
            if (res && Array.isArray(res.data)) {
                return res.data;
            }
            return [];
        },
    });

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
            <Input
                placeholder="Tìm kiếm theo tên/email..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full md:w-1/3"
            />

            <Select value={roleFilter} onValueChange={onRoleChange}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Chọn role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {roles.map((role: any) => (
                        <SelectItem key={role._id} value={role._id}>
                            {role.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default FilterRoles;
