import { name } from '@/store/reducer/admin/food/food_manager.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const foodManageraction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(foodManageraction.firstFetch);

// add size
export const addSize = createAction(foodManageraction.create + '/SIZE', (state) => ({
    payload: state,
}));

// update size 
export const updateSize = createAction(foodManageraction.update + '/SIZE', (state) => ({
    payload : state
}) )

// remove food size
export const removeFoodSize = createAction(foodManageraction.delete + '/FOOD_SIZE', (state) => ({
    payload: state,
}));

// fetch food
export const fetchFood = createAction(`${name}/FETCH_FOOD`);

// create foodSize
export const createFoodSize = createAction(`${name}/CREATE_FOOD_SIZE`, (state) => ({
    payload: state,
}));

//update food
export const updateFood = createAction(foodManageraction.update, (state) => ({
    payload: state,
}));

// create food
export const addFood = createAction(foodManageraction.create, (state) => ({
    payload: state,
}));

// delete food 
export const deleteFood = createAction(`${name}/DELETE_FOOD`, (state) => ({
    payload : state
}))

// change
export const changePage = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));
