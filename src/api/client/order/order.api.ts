import HttpService from '@/config/httpService';

class OrderApi extends HttpService {
    order = (data: any, token: string) => {
        return this.post(data, 'order', token);
    };
    getOrderByFilter = (filter: any, token) => {
        return this.post(filter, 'all', token);
    };
    updateOrder = (id: number, data: any, token: string) => {
        return this.put(id, data, 'order', token);
    };
}

export const orderApi = new OrderApi('order');
