import HttpService from '@/config/httpService';

class SizeApi extends HttpService {
    getSizeForFilter = (data: any) => {
        return this.post(data, 'all');
    };
}

export const sizeApi = new SizeApi('size');
