import HttpService from '@/config/httpService';

class SearchApi extends HttpService {
    searchFoods(query: string) {
        return this.get(`/search?query=${encodeURIComponent(query)}`);
    };
}

export const searchApi = new SearchApi('search');