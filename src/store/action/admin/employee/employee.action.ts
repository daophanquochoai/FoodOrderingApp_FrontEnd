import { name } from '@/store/reducer/admin/employee/employee.reducer';
import { getCommonActionsTypeByName } from '../../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const employeeAction = getCommonActionsTypeByName(name);

// fetch first
export const fetchFirst = createAction(employeeAction.firstFetch);

// create employee
export const createEmployee = createAction(employeeAction.create, (state) => ({ payload: state }));

// update employee
export const updateEmployee = createAction(employeeAction.update, (state) => ({ payload: state }));

// change page
export const changePageEmployee = createAction(`${name}/CHANGE_PAGE`, (state) => ({
    payload: state,
}));

// delete employee
export const deleteEmployee = createAction(`${name}/DELETE_EMPLOYEE`, (state) => ({payload : state}));
