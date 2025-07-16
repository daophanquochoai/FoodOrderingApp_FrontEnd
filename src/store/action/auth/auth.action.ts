import { createAction } from '@reduxjs/toolkit';
import { getCommonActionsTypeByName } from '../actionType/actionType';
import { name } from '../../reducer/auth';

const commonAction = getCommonActionsTypeByName(name);

export const loginAction = createAction(commonAction.loginState, (state) => ({
    payload: state,
}));
