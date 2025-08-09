import { searchApi } from '@/api/client/search/search.api';
import * as actions from '@/store/action/client/search/search.action';
import searchSlice from '@/store/reducer/client/search/search.reducer';
import { all, call, fork, put, takeLatest } from 'typed-redux-saga';

function* handleSearchFoods({ payload }) {
    yield put(searchSlice.actions.setQuery(payload));
    if (!payload || payload.length < 2) {
        yield put(searchSlice.actions.setResults([]));
        return;
    }

    yield put(searchSlice.actions.setLoading(true));
    try {
        const { data } = yield call([searchApi, searchApi.searchFoods], payload);
        yield put(searchSlice.actions.setResults(data?.data || []));
    } catch (error) {
        console.error('Search error:', error);
        yield put(searchSlice.actions.setResults([]));
    } finally {
        yield put(searchSlice.actions.setLoading(false));
    }
}

function* handleClearSearchResults() {
    yield put(searchSlice.actions.setQuery(''));
    yield put(searchSlice.actions.setResults([]));
}

function* watchSearchFoods() {
    yield takeLatest(actions.searchFoods, handleSearchFoods);
}
function* watchClearSearchResults() {
    yield takeLatest(actions.clearSearchResults, handleClearSearchResults);
}

export function* watchSearch() {
    yield all([fork(watchSearchFoods), fork(watchClearSearchResults)]);
}
