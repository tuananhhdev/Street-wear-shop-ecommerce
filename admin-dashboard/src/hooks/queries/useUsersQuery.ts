import { userService } from "@/services/user.service";
import type { IUserQuery } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useUsersQuery = (params?: IUserQuery) => {
    return useQuery({
        queryKey: ["users", params],
        queryFn: () => userService.getUsers(params),
        staleTime: 1000 * 60,
    });
};
