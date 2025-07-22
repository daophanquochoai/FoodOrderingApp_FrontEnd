import HttpService from '@/config/httpService';

class SizeApi extends HttpService {
    getSizeForFilter = (data: any) => {
        return this.post(data, 'all');
    };
    addSize = (data : any) => {
        return this.post(data, 'add');
    }
}

export const sizeApi = new SizeApi('size');
