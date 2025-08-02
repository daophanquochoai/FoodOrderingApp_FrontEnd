import HttpService from '@/config/httpService';

class FilterHistryApi extends HttpService {
    getFilter = (data: any, token) => {
        return this.post(data, 'all', token);
    };
}
export const filterHistoryApi = new FilterHistryApi('history/filter');
