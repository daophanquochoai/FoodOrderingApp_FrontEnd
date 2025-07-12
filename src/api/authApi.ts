import HttpService from '../config/httpService';

class AuthApi extends HttpService {
    constructor() {
        super('auth');
    }

    login = (data: { email: string; password: string }) => this.post(data, 'login');
}

export const authService = new AuthApi();
