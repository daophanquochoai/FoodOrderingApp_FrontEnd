import HttpService from '@/config/httpService';
import { createUser } from '@/type/store/auth/authSlide';

class UserApi extends HttpService {
    createUser = (data: createUser) => {
        return this.post(data, 'add');
    };
    getUser = (username: any, token: string) => {
        return this.get(`user/username/${username}`, token);
    };
    updateUser = (data: any, id: any, token) => {
        return this.put(id, data, 'update', token);
    };
}

export const userApi = new UserApi('user');
