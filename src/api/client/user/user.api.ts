import HttpService from '@/config/httpService';
import { createUser } from '@/type/store/auth/authSlide';

class UserApi extends HttpService {
    createUser = (data: createUser) => {
        return this.post(data, 'add');
    };
}

export const userApi = new UserApi('user');
