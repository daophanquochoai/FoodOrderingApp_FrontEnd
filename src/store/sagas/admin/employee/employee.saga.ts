import { employeeApi } from '@/api/admin/employee/employee.api';
import {
    changePageEmployee,
    createEmployee,
    deleteEmployee,
    fetchFirst,
    updateEmployee,
} from '@/store/action/admin/employee/employee.action';
import { common, employee } from '@/store/reducer';
import { selectFilter } from '@/store/selector/admin/employee/employee.selector';
import { ModalType } from '@/type/store/common';
import { getCookies } from '@/utils/cookies/cookies';
import { takeEvery } from 'redux-saga/effects';
import { all, call, fork, put, select } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(employee.actions.setLoadingPage(true));
    try {
        yield handleFetchEmployee();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(employee.actions.setLoadingPage(false));
    }
}

function* handleFetchEmployee() {
    try {
        const filter = yield all({
            filter: select(selectFilter),
        });
        const tokenRaw = getCookies('access_token');
        const { data } = yield call(employeeApi.getEmployeeByFilter, filter.filter, tokenRaw);

        yield put(employee.actions.setEmployee(data?.data?.data || []));
        yield put(employee.actions.setTotalEmploye(data?.data?.totalPage || 0));
    } catch (e) {
        console.error(e);
    }
}

function* handleChangePage({ payload }) {
    yield put(employee.actions.setLoadingPage(true));
    try {
        yield put(employee.actions.setPage(payload));
        yield handleFetchEmployee();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(employee.actions.setLoadingPage(false));
    }
}

function* handleCreateEmployee({ payload }) {
    yield put(employee.actions.setLoadingComponent(true));
    try {
        const tokenRaw = getCookies('access_token');
        yield call(employeeApi.createEmployee, payload, tokenRaw);
        yield put(common.actions.setHiddenModal(ModalType.EMP_ACCCOUNT_MANAGEMENT));
        yield handleFetchFirst();
        yield put(common.actions.setSuccessMessage('Create employee successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(employee.actions.setLoadingComponent(false));
    }
}

function* handleUpdateEmployee({ payload }) {
    yield put(employee.actions.setLoadingComponent(true));
    try {
        const tokenRaw = getCookies('access_token');
        yield call(employeeApi.updateEmployee, payload?.id, payload, tokenRaw);
        yield put(common.actions.setHiddenModal(ModalType.EMP_ACCCOUNT_MANAGEMENT));
        yield handleFetchFirst();
        yield put(common.actions.setSuccessMessage('Update employee successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(employee.actions.setLoadingComponent(false));
    }
}

function* handleDeleteEmployee({ payload }) {
    yield put(employee.actions.setLoadingComponent(true));
    try {
        const tokenRaw = getCookies('access_token');
        yield call(employeeApi.updatePasswrod, payload, tokenRaw);
        yield handleFetchFirst();
        yield put(common.actions.setSuccessMessage('Reset employee successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(employee.actions.setLoadingComponent(false));
    }
}

function* watchFecthFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

function* watchChangePage() {
    yield takeEvery(changePageEmployee, handleChangePage);
}

function* watchCreateEmployee() {
    yield takeEvery(createEmployee, handleCreateEmployee);
}

function* watchUpdateEmployee() {
    yield takeEvery(updateEmployee, handleUpdateEmployee);
}

function* watchDeleteEmployee() {
    yield takeEvery(deleteEmployee, handleDeleteEmployee);
}

export function* watchEmployee() {
    yield all([
        fork(watchFecthFirst),
        fork(watchChangePage),
        fork(watchCreateEmployee),
        fork(watchUpdateEmployee),
        fork(watchDeleteEmployee),
    ]);
}
