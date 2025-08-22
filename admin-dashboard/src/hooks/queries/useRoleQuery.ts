import { roleService } from "@/services/role.service";
import { useQuery } from "@tanstack/react-query";

export function useRoleQuery() {
    return useQuery({
        queryKey: ['roles'],
        queryFn: roleService.getRoles
    })
}