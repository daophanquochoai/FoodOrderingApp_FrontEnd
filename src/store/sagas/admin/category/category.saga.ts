import { categoryApi } from '@/api/client/category/category.api';
import { collectionApi } from '@/api/client/collection/collection.api';
import { filterApi } from '@/api/filter/fitler.api';
import { filter } from '@/defaultValue/common';
import {
    createCategory,
    deleteCategory,
    fetchCategoryFirst,
    updateCategory,
} from '@/store/action/admin/category/category.action';
import { category, common } from '@/store/reducer';
import { selectFilter } from '@/store/selector/admin/category/category.selector';
import { EStatusCategory } from '@/type/store/client/collection/collection.style';
import { ModalType } from '@/type/store/common';
import { takeLeading } from 'redux-saga/effects';
import { all, call, fork, put, select, takeEvery } from 'typed-redux-saga';

// hanlde fetch first
function* handleFetchFirst() {
    yield put(common.actions.setLoading(true));

    try {
        //fetch category
        yield handleFetchCategoryTable();
        // fetch filet
        yield handleFetchFilterOption();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(common.actions.setLoading(false));
    }
}

// fetch data table
function* handleFetchCategoryTable() {
    try {
        const { fitler } = yield all({
            fitler: select(selectFilter),
        });
        
        const updatedFilter = {
            ...fitler,
            statusCategories:
                fitler.statusCategories.length === 0
                    ? [EStatusCategory.ACTIVE]
                    : [...fitler.statusCategories],
        };
        
        const { data } = yield call(collectionApi.getCategoryByFilter, updatedFilter);
        
        yield put(category.actions.setCategory(data?.data));
    } catch (e) {
        console.error(e);
    }
}

//delete category
function* handleDeleteCategory({ payload }) {
    try {
        yield call(categoryApi.updateCategory, {
            ...payload,
            status: 'DELETE',
        });
        yield put(category.actions.setLoading(true));
        //fetch category
        yield handleFetchCategoryTable();

        yield put(common.actions.setHiddenModal(ModalType.CATEGORY));
        yield put(common.actions.setSuccessMessage('Update category successful'));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(category.actions.setLoading(false));
    }
}

// update category
function* handleUpdateCategory({ payload }) {
    try {
        yield call(categoryApi.updateCategory, payload);
        yield put(category.actions.setLoading(true));
        //fetch category
        yield handleFetchCategoryTable();

        yield put(common.actions.setHiddenModal(ModalType.CATEGORY));
        yield put(common.actions.setSuccessMessage('Update category successful'));
    } catch (e) {
        yield put(common.actions.setErrorMessage(e?.message));
        console.error(e);
    } finally {
        yield put(category.actions.setLoading(false));
    }
}

// create category
function* handleCreateCategory({ payload }) {
    try {
        yield call(categoryApi.createCategory, payload);
        yield put(category.actions.setLoading(true));
        //fetch category
        yield handleFetchCategoryTable();

        yield put(common.actions.setHiddenModal(ModalType.CATEGORY));
        yield put(common.actions.setSuccessMessage('Create ategory successful'));
    } catch (e) {
        yield put(common.actions.setErrorMessage(e?.message));
        console.error(e);
    } finally {
        yield put(category.actions.setLoading(false));
    }
}

// handle get filter
function* handleFetchFilterOption() {
    try {
        const { data } = yield call(filterApi.getFilter, {
            options: ['CATEGORY'],
        });
        yield put(category.actions.setFilterOption(data?.data?.category || []));
    } catch (e) {
        yield put(common.actions.setErrorMessage(e?.message));
    }
}

// watch delete category
function* watchDeleteCategory() {
    yield takeEvery(deleteCategory, handleDeleteCategory);
}

//watch update category
function* watchUpdateCategory() {
    yield takeEvery(updateCategory, handleUpdateCategory);
}

//watch create category
function* watchCreateCategory() {
    yield takeEvery(createCategory, handleCreateCategory);
}

// watch fetch first category
function* watchFetchFirst() {
    yield takeLeading(fetchCategoryFirst, handleFetchFirst);
}

// watch all category
export function* watchCategogy() {
    yield* all([
        fork(watchFetchFirst),
        fork(watchCreateCategory),
        fork(watchUpdateCategory),
        fork(watchDeleteCategory),
    ]);
}
