import HttpService from '@/config/httpService';

class PaymentApi extends HttpService {
    getPayment = (filter: any) => {
        return this.post(filter, 'all');
    };
}

export const paymentApi = new PaymentApi('payment');
