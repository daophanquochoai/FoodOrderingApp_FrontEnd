import { getCommonActionsTypeByName } from '../actionType/actionType';
import { createAction } from '@reduxjs/toolkit';

const commonAction = getCommonActionsTypeByName('common');

/**
 * action fetch first
 */
export const fetchFirst = createAction(commonAction.firstFetch, (state) => ({
    payload: state,
}));
