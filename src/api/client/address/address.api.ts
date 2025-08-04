import HttpService from '@/config/httpService';

class AddressApi extends HttpService {
    getAddress = (filter: any, token: string) => {
        return this.post(filter, 'all', token);
    };
    createAddress = (data: any, token: string) => {
        return this.post(data, 'add', token);
    };
    updateAddress = (data: any, id: number, token: string) => {
        return this.put(id, data, 'update', token);
    };
    seDefault = (id: number, userId: number, token: string) => {
        return this.put(userId, null, `set_default/${id}`, token);
    };
}

export const addressApi = new AddressApi('address');
