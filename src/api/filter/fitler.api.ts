import HttpService from '@/config/httpService';

class FilterApi extends HttpService {
    getFilter = (data: any) => {
        return this.post(data, 'all');
    };
}

export const filterApi = new FilterApi('filter');
