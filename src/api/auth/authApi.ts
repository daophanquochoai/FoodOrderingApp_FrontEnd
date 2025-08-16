import HttpService from '../../config/httpService';

class AuthApi extends HttpService {
    login = (data: { username: string; password: string }) =>
        this.post<{ access_token; refresh_token; data }>(data, 'login');
    logout = (data: { accessToken: string; refreshToken: string }) => {
        this.post(data, 'logout');
    };
    forget = (email: string) => {
        this.get(`auth/forget/${email}`);
    };
    updateForget = (email: string, token: string, data: any) => {
        this.put(email, data, 'update', token);
    };
}

export const authApi = new AuthApi('auth');
