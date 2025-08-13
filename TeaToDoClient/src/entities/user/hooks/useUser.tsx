import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user-api";

export const useUser = () => {
    const { data } = useQuery({
        queryKey: [userApi.baseKey, "info"],
        queryFn: userApi.getUserInfo,
        select: data => data.data
    });

    return { 
        data
    }
}