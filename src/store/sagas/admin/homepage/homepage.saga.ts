import { categoryHomepageApi } from "@/api/admin/homepage/category_homepage.api";
import { foodHomepageApi } from "@/api/admin/homepage/food_homepage.api";
import { foodApi } from "@/api/client/collection/food.api";
import { collectionApi } from "@/api/client/collection/collection.api";
import { common, food } from '@/store/reducer';
import * as actions from '@/store/action/admin/homepage/homepage.action';
import homepageManagementSlice from '@/store/reducer/admin/homepage/homepage.reducer';
import { 
  selectHomepageCategories, 
  selectLatestProducts, 
  selectDealOfWeek 
} from '@/store/selector/admin/homepage/homepage.selector';
import { put, call, all, fork, select } from 'typed-redux-saga';
import { takeEvery } from "redux-saga/effects";

function* handleFetchCategories() {
  try {
    yield put(homepageManagementSlice.actions.setCategoriesLoading(true));

    const allCategoriesResponse = yield call(collectionApi.getCategoryByFilter, { 
      pageNo: 0, 
      pageSize: 1000,
      search: "",
      sort: "asc",
      order: "id",
      deep: 1
    });
    const homepageCategoriesResponse = yield call([categoryHomepageApi, categoryHomepageApi.getCategoryHomepage]);

    const allCategories = allCategoriesResponse.data.data.data;
    const homepageCategories = homepageCategoriesResponse.data.data;

    const dealOfWeekCategoryIds = homepageCategories.map(item => item.category.id);
    // Filter out categories that are already in the deal of the week
    const availableCategories = allCategories.filter(category => !dealOfWeekCategoryIds.includes(category.id));

    yield put(homepageManagementSlice.actions.setCategories(availableCategories));
    yield put(homepageManagementSlice.actions.setHomepageCategories(homepageCategories));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    yield put(common.actions.setErrorMessage('Failed to load categories'));
  } finally {
    yield put(homepageManagementSlice.actions.setCategoriesLoading(false));
  }
}

function* handleAddHomepageCategories(action: ReturnType<typeof actions.addCategoryToHomepage>) {
  try {
    // Lấy category từ action payload
    const record = action.payload;

    // Gọi API để thêm một danh mục vào homepage
     yield call(
      [categoryHomepageApi, categoryHomepageApi.addCategoryHomepage],
      { category: { id: record.id } }
    );
    
    // Refresh dữ liệu sau khi thêm thành công
    yield call(handleFetchCategories);

    yield put(common.actions.setSuccessMessage(`Added ${record.name || 'category'} to homepage`));
  } catch (error) {
    console.error('Failed to add category to homepage:', error);
    yield put(common.actions.setErrorMessage('Failed to add category to homepage'));
  }
}


function* handleFetchLatestProducts() {
  try {
    yield put(homepageManagementSlice.actions.setLatestProductsLoading(true));
    
    const allProductsResponse = yield call(foodApi.getFoodByFilter, { 
      pageNo: 0, 
      pageSize: 1000,
      search: "",
      sort: "asc",
      order: "id",
      deep: 1
    });
    const latestProductsResponse = yield call([foodHomepageApi, foodHomepageApi.getLatestFoodHomepage]);
    
    const allProducts = allProductsResponse.data.data.data;
    const latestProducts = latestProductsResponse.data.data;

    const dealOfWeekProductIds = latestProducts.map(item => item.food.id);
    // Filter out products that are already in the deal of the week
    const availableProducts = allProducts.filter(product => !dealOfWeekProductIds.includes(product.id));

    yield put(homepageManagementSlice.actions.setProducts(availableProducts));
    yield put(homepageManagementSlice.actions.setLatestProducts(latestProducts));
  } catch (error) {
    console.error('Failed to fetch latest products:', error);
    yield put(common.actions.setErrorMessage('Failed to load latest products'));
  } finally {
    yield put(homepageManagementSlice.actions.setLatestProductsLoading(false));
  }
}

function* handleAddLatestProducts(action: ReturnType<typeof actions.addProductToLatest>) {
  try {
    const record = action.payload;
    
    yield call(
      [foodHomepageApi, foodHomepageApi.addFoodHomepage],
      { food: { id: record.id }, feature: 'latest-product' }
    );

    yield call(handleFetchLatestProducts);
    
    yield put(common.actions.setSuccessMessage('Latest products saved successfully'));
  } catch (error) {
    console.error('Failed to save latest products:', error);
    yield put(common.actions.setErrorMessage('Failed to save latest products'));
  }
}

function* handleFetchDealOfWeek() {
  try {
    yield put(homepageManagementSlice.actions.setDealOfWeekLoading(true));
    
    const allProductsResponse = yield call(foodApi.getFoodByFilter, {
      pageNo: 0, 
      pageSize: 1000,
      search: "",
      sort: "asc",
      order: "id",
      deep: 1
    });
    const dealOfWeekProductsResponse = yield call([foodHomepageApi, foodHomepageApi.getDealOfTheWeekHomepage]);

    const allProducts = allProductsResponse.data.data.data;
    const dealOfWeekProducts = dealOfWeekProductsResponse.data.data;

    const dealOfWeekProductIds = dealOfWeekProducts.map(item => item.food.id);
    // Filter out products that are already in the deal of the week
    const availableProducts = allProducts.filter(product => !dealOfWeekProductIds.includes(product.id));

    yield put(homepageManagementSlice.actions.setProducts(availableProducts));
    yield put(homepageManagementSlice.actions.setDealOfWeek(dealOfWeekProducts));
  } catch (error) {
    console.error('Failed to fetch deal of the week:', error);
    yield put(common.actions.setErrorMessage('Failed to load deal of the week'));
  } finally {
    yield put(homepageManagementSlice.actions.setDealOfWeekLoading(false));
  }
}

function* handleAddDealOfWeek(action: ReturnType<typeof actions.addDealOfWeek>) {
  try {
    const record = action.payload;

    yield call(
      [foodHomepageApi, foodHomepageApi.addFoodHomepage],
      { food: { id: record.id }, feature: 'deal-of-the-week' }
    );

    yield call(handleFetchDealOfWeek);
    
    yield put(common.actions.setSuccessMessage('Deal of the week saved successfully'));
  } catch (error) {
    console.error('Failed to save deal of the week:', error);
    yield put(common.actions.setErrorMessage('Failed to save deal of the week'));
  }
}

function* handleDeleteCategoryHomepage(action: ReturnType<typeof actions.removeCategoryFromHomepage>) {
  try {
    const record = action.payload;
    
    // Gọi API xóa danh mục
    yield call(
      [categoryHomepageApi, categoryHomepageApi.deleteCategoryHomepage],
      { category: record.category }, // data
      record.id // id
    );
    
    // Refresh dữ liệu sau khi xóa thành công
    yield call(handleFetchCategories);

    yield put(common.actions.setSuccessMessage('Category removed from homepage'));
  } catch (error) {
    console.error('Failed to remove category from homepage:', error);
    yield put(common.actions.setErrorMessage('Failed to remove category from homepage'));
  }
}

function* handleDeleteHomepageItem(action: ReturnType<typeof actions.removeCategoryFromHomepage>) {
  try {
    const item = action.payload;
    
    yield call(
      [foodHomepageApi, foodHomepageApi.deleteFoodHomepage],
      { food: item.food }, // data
      item.id // id
    );
    
    // Refresh dữ liệu sau khi xóa thành công
    yield call(handleFetchDealOfWeek);
    yield call(handleFetchLatestProducts);

    yield put(common.actions.setSuccessMessage('Item removed from homepage'));
  } catch (error) {
    console.error('Failed to remove item from homepage:', error);
    yield put(common.actions.setErrorMessage('Failed to remove item from homepage'));
  }
}

function* watchFetchCategories() {
  yield takeEvery(actions.fetchCategoryHomepage.type, handleFetchCategories);
}
function* watchAddHomepageCategories() {
  yield takeEvery(actions.addCategoryToHomepage.type, handleAddHomepageCategories);
}
function* watchFetchLatestProducts() {
  yield takeEvery(actions.fetchLatestProducts.type, handleFetchLatestProducts);
}
function* watchAddLatestProducts() {
  yield takeEvery(actions.addProductToLatest.type, handleAddLatestProducts);
}
function* watchFetchDealOfWeek() {
  yield takeEvery(actions.fetchDealOfWeek.type, handleFetchDealOfWeek);
}
function* watchAddDealOfWeek() {
  yield takeEvery(actions.addDealOfWeek.type, handleAddDealOfWeek);
}
function* watchDeleteCategoryHomepageItem() {
  yield takeEvery(actions.removeCategoryFromHomepage.type, handleDeleteCategoryHomepage);
}
function* watchDeleteFoodHomepageItem() {
  yield takeEvery(actions.removeProductFromHomepage.type, handleDeleteHomepageItem);
}

export function* watchHomepage() {
    yield all([
        fork(watchFetchCategories),
        fork(watchAddHomepageCategories),
        fork(watchFetchLatestProducts),
        fork(watchAddLatestProducts),
        fork(watchFetchDealOfWeek),
        fork(watchAddDealOfWeek),
        fork(watchDeleteCategoryHomepageItem),
        fork(watchDeleteFoodHomepageItem),
    ]);
}