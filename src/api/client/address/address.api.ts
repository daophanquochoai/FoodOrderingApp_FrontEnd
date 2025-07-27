import HttpService from '@/config/httpService';

class AddressApi extends HttpService {
    getAddress = (filter: any, token: string) => {
        return this.post(filter, 'all', token);
    };
    createAddress = (data: any, token : string) => {
        return this.post(data, 'add', token);
    };
}

export const addressApi = new AddressApi('address');
