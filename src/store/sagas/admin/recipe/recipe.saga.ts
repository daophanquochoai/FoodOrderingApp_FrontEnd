import { foodIngredientsApi } from '@/api/admin/ingredients/food_ingredients.api';
import { ingredientApi } from '@/api/admin/ingredients/ingredient.api';
import { foodApi } from '@/api/client/collection/food.api';
import { filterApi } from '@/api/filter/fitler.api';
import {
    changePage,
    createRecipe,
    fetchFilter,
    fetchFilterOption,
    fetchFirst,
    fetchIngredinetsByFoodSize,
    updateRecipe,
} from '@/store/action/admin/recipe/recipe.action';
import { common, recipe } from '@/store/reducer';
import { selectFilter } from '@/store/selector/admin/recipe/recipe.selector';
import { ModalType } from '@/type/store/common';
import { getCookies } from '@/utils/cookies/cookies';
import { takeEvery } from 'redux-saga/effects';
import { all, call, fork, put, select } from 'typed-redux-saga';

function* handleFetchFirst() {
    yield put(recipe.actions.setLoadingPage(true));
    try {
        yield handleFetchFood();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(recipe.actions.setLoadingPage(false));
    }
}

function* handleFetchFood() {
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });
        const { data } = yield call(foodApi.getFoodByFilter, filter);
        yield put(recipe.actions.setTotalPage(data?.data?.totalPage));
        yield put(recipe.actions.setFoodList(data?.data?.data));
    } catch (e) {
        console.error(e);
    }
}

function* handleChangePage({ payload }) {
    yield put(recipe.actions.setLoadingPage(true));
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });
        yield put(
            recipe?.actions.setFilter({
                ...filter,
                pageNo: payload,
            })
        );
        yield handleFetchFood();
    } catch (e) {
        console.error(e);
    } finally {
        yield put(recipe.actions.setLoadingPage(false));
    }
}

function* handleFetchFilterOption() {
    yield put(recipe.actions.setLoadingComponent(true));
    try {
        const { data } = yield call(filterApi.getFilter, {
            options: ['FOOD', 'SIZE', 'INGREDIENTS'],
        });
        yield put(
            recipe.actions.setFilterOption({
                food: data?.data?.food,
                size: data?.data?.size,
                ingredients: data?.data?.ingredients,
            })
        );
    } catch (e) {
        console.error(e);
    } finally {
        yield put(recipe.actions.setLoadingComponent(false));
    }
}

function* handleFetchIngredients({ payload }) {
    yield put(recipe.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');
        const { data } = yield call(ingredientApi.getIngredientByFilter, payload, token);
        console.log(data);
        yield put(recipe.actions.setIngredients(data?.data));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(recipe.actions.setLoadingComponent(false));
    }
}

function* handleCreateRecipe({ payload }) {
    yield put(recipe.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');

        const dataCreate = payload?.ingredients?.map((i) => ({
            quantityPerUnit: i?.quantity_per_unit || 0,
            ingredients: {
                id: i?.ingredients_id,
            },
        }));
        yield call(foodIngredientsApi.createIngredients, dataCreate, payload?.size, token);

        yield put(common.actions.setSuccessMessage('Create Successful'));
        yield put(common.actions.setHiddenModal(ModalType.RECIPE_MANAGEMENT));
    } catch (e) {
        console.error(e);
    } finally {
        yield put(recipe.actions.setLoadingComponent(false));
    }
}

function* handleUpdateRecipe({ payload }) {
    yield put(recipe.actions.setLoadingComponent(true));
    try {
        const token = getCookies('access_token');

        const dataCreate = payload?.ingredients?.map((i) => ({
            quantityPerUnit: i?.quantity_per_unit || 0,
            ingredients: {
                id: i?.ingredients_id?.value || i?.ingredients_id,
            },
        }));
        yield call(foodIngredientsApi.updateIngredinet, dataCreate, payload?.sizeId, token);
        yield put(common.actions.setSuccessMessage('Update Successful'));
        yield put(common.actions.setHiddenModal(ModalType.RECIPE_MANAGEMENT));
    } catch (e) {
        console.error(e);
        yield put(common.actions.setErrorMessage(e?.message));
    } finally {
        yield put(recipe.actions.setLoadingComponent(false));
    }
}

function* handleFetchFilter() {
    try {
        const { filter } = yield all({
            filter: select(selectFilter),
        });
        yield put(recipe?.actions.setFilter(filter));
        yield handleFetchFood();
    } catch (e) {
        console.error(e);
    }
}

function* watchFetchFirst() {
    yield takeEvery(fetchFirst, handleFetchFirst);
}

function* watchChangePage() {
    yield takeEvery(changePage, handleChangePage);
}

function* watchFetchFilterOption() {
    yield takeEvery(fetchFilterOption, handleFetchFilterOption);
}

function* watchFetchIngredinets() {
    yield takeEvery(fetchIngredinetsByFoodSize, handleFetchIngredients);
}

function* watchCreateRecipe() {
    yield takeEvery(createRecipe, handleCreateRecipe);
}

function* watchUpdateRecipe() {
    yield takeEvery(updateRecipe, handleUpdateRecipe);
}

function* watchChangeFilter() {
    yield takeEvery(fetchFilter, handleFetchFilter);
}

export function* watchRecipe() {
    yield all([
        fork(watchFetchFirst),
        fork(watchChangePage),
        fork(watchFetchFilterOption),
        fork(watchFetchIngredinets),
        fork(watchCreateRecipe),
        fork(watchUpdateRecipe),
        fork(watchChangeFilter),
    ]);
}
