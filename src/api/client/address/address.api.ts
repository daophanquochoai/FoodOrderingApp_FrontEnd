import HttpService from '@/config/httpService';

class AddressApi extends HttpService {
    getAddress = (filter: any, token: string) => {
        return this.post(filter, 'all', token);
    };
}

export const addressApi = new AddressApi('address');
