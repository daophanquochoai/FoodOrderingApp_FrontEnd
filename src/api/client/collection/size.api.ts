import HttpService from '@/config/httpService';

class SizeApi extends HttpService {
    getSizeForFilter = (data: any) => {
        return this.post(data, 'all');
    };
    addSize = (data : any) => {
        return this.post(data, 'add');
    };
    updateSize = (data : any, id : any, token : string) => {
        return this.put(id, data, 'update', token);
    }
}

export const sizeApi = new SizeApi('size');
