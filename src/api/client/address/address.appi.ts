import HttpService from '@/config/httpService';

class AddressApi extends HttpService {
    getAddress = (filter: any) => {
        return this.post(filter, 'all');
    };
}

export const addressApi = new AddressApi('address');
