import HttpService from '@/config/httpService';

class FilterApi extends HttpService {
    getFilter = (data: any, state = 'user') => {
        return this.post(data, `all/${state}`);
    };
}

export const filterApi = new FilterApi('filter');
