import HttpService from '@/config/httpService';
import { FilterCategory } from '@/type/store/client/collection/collection.style';

class CollectionApi extends HttpService {
    getCategoryByFilter = (data: FilterCategory) => {
        return this.post<any>(data, 'all');
    };
}

export const collectionApi = new CollectionApi('category');
