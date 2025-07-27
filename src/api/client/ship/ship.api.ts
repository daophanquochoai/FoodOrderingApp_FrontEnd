import HttpService from '@/config/httpService';

class ShipApi extends HttpService {
    getShip = (token: string) => {
        return this.get('shipping_fee_config', token);
    };
}

export const shipApi = new ShipApi('shipping_fee_config');
