import HttpService from '../../config/httpService';

class AuthApi extends HttpService {
    login = (data: { username: string; password: string }) =>
        this.post<{ access_token; refresh_token; data }>(data, 'login');
    logout = (data: { accessToken: string; refreshToken: string }) => {
        this.post(data, 'logout');
    };
}

export const authApi = new AuthApi('auth');
