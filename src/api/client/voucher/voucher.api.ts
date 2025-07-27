import HttpService from '@/config/httpService';

class VoucherApi extends HttpService {
    getVoucherByFilter = (data: any) => {
        return this.post(data, 'all');
    };
}
export const voucherApi = new VoucherApi('voucher');
