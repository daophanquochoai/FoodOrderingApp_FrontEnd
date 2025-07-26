import HttpService from '@/config/httpService';

class SourceApi extends HttpService {
    getSourceByFilter = (filter: any) => {
        return this.post(filter, 'all');
    };
    updateSource = (data: any, id: any) => {
        return this.instance.put(`/source/update/${id}`, data);
    };
    addSource = (data: any) => {
        return this.post(data, 'add');
    };
}

export const sourceApi = new SourceApi('source');
