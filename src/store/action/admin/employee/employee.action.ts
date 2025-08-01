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

// reset password employee
export const resetPasswordEmployee = createAction(`${name}/RESET_PASSWORD_EMPLOYEE`, (state) => ({
    payload: state,
}));

// fetch employee by id
export const fetchEmployeeByUsername = createAction(`${name}/FETCH_EMPLOYYEE_USERNAME`);

// update password employee
export const updatePasswordEmployee = createAction(`${name}/UPDATE_PASSWORD`, (state) => ({
    payload: state,
}));
