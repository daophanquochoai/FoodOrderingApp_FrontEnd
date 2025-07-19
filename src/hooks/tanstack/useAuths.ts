import { useQuery } from '@tanstack/react-query';
import { authApi } from '../../api/auth/authApi';

export const useUsers = (username, password) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => authApi.login({ username, password }),
    });
};
