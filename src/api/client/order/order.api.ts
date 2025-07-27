import HttpService from '@/config/httpService';

class OrderApi extends HttpService {
    order = (data: any, token: string) => {
        return this.post(data, 'order', token);
    };
}

export const orderApi = new OrderApi('order');
