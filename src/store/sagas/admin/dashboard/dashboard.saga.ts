import { dashboardApi } from '@/api/admin/dashboard/dashboard.api';
import * as actions from '@/store/action/admin/dashboard/dashboard.action';
import { dashboard } from '@/store/reducer';
import { all, call, fork, put, takeEvery } from 'typed-redux-saga';
import { getCookies } from '@/utils/cookies/cookies';

function* fetchDashboardTotal({ payload }) {
    yield put(dashboard.actions.setDashboardLoading(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(dashboardApi.getDashboardTotal, payload, token);
        yield put(dashboard.actions.setDashboardTotal(data?.data));
        yield handleFetchSellFood({payload});
    } catch (error) {
        console.log(error);
    } finally {
        yield put(dashboard.actions.setDashboardLoading(false));
    }
}

function* fetchMonthlyRevenue({ payload }) {
    yield put(dashboard.actions.setDashboardLoading(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(dashboardApi.getMonthlyRevenue, payload.year, token);
        yield put(dashboard.actions.setMonthlyRevenue(data?.data));
    } catch (error) {
        console.log(error);
    } finally {
        yield put(dashboard.actions.setDashboardLoading(false));
    }
}

function* fetchOrderYears() {
    yield put(dashboard.actions.setDashboardLoading(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(dashboardApi.getOrderYears, token);
        yield put(dashboard.actions.setOrderYears(data?.data));
    } catch (error) {
        console.log(error);
    } finally {
        yield put(dashboard.actions.setDashboardLoading(false));
    }
}

function* handleFetchSellFood({payload}){
    try{
        const token = getCookies('access_token');
        const {data} = yield call(dashboardApi.getSellFood, payload, token);
        console.log(data?.data)
        const formattedData = Object.entries(data?.data || []).map(([label, value]) => ({
            label,
            value
          }));
        yield put(dashboard.actions.setSellFood(formattedData))
    }catch(e){
        console.error(e);
    }
}

function* watchFetchDashBoardTotal() {
    yield* takeEvery(actions.fetchDashboardTotal, fetchDashboardTotal);
}

function* watchFetchMonthlyRevenue() {
    yield* takeEvery(actions.fetchMonthlyRevenue, fetchMonthlyRevenue);
}

function* watchFetchOrderYears() {
    yield* takeEvery(actions.fetchOrderYears, fetchOrderYears);
}

function* watchGetSellFood(){
    yield* takeEvery(actions.getSellFood, handleFetchSellFood);
}

export function* watchDashboard() {
    yield all([
        fork(watchFetchDashBoardTotal),
        fork(watchFetchMonthlyRevenue),
        fork(watchFetchOrderYears),
    ]);
}
