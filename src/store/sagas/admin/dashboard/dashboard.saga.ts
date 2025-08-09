import { dashboardApi } from "@/api/admin/dashboard/dashboard.api";
import * as actions from "@/store/action/admin/dashboard/dashboard.action";
import { dashboard } from "@/store/reducer";
import { all, call, fork, put, takeEvery } from 'typed-redux-saga';
import { getCookies } from '@/utils/cookies/cookies';

function* fetchDashboardTotal() {
    yield put(dashboard.actions.setDashboardLoading(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(dashboardApi.getDashboardTotal, token);
        yield put(dashboard.actions.setDashboardTotal(data?.data));
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

function* watchFetchDashBoardTotal() {
    yield* takeEvery(actions.fetchDashboardTotal, fetchDashboardTotal);
}

function* watchFetchMonthlyRevenue() {
    yield* takeEvery(actions.fetchMonthlyRevenue, fetchMonthlyRevenue);
}

function* watchFetchOrderYears() {
    yield* takeEvery(actions.fetchOrderYears, fetchOrderYears);
}

export function* watchDashboard() {
    yield all([
        fork(watchFetchDashBoardTotal),
        fork(watchFetchMonthlyRevenue),
        fork(watchFetchOrderYears),
    ]);
}