import HttpService from '../config/httpService';

class AuthApi extends HttpService {
    constructor() {
        super('/auth');
    }
}

export const authService = new AuthApi();
