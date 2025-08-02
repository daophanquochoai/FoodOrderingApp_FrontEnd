import HttpService from '@/config/httpService';

class VoucherApi extends HttpService {
    getVoucherByFilter = (data: any, token: string) => {
        return this.post(data, 'all', token);
    };
    updateVoucher = (data: any, id: number, token: string) => {
        return this.put(id, data, 'update', token);
    };
    createVoucher = (data: any, token: string) => {
        return this.post(data, 'add', token);
    };
    exportVoucher = (data: any, token: string) => {
        return this.post(data, 'export/voucher', token);
    };
}
export const voucherApi = new VoucherApi('voucher');
