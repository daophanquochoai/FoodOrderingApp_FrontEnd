import { name } from '../../reducer/common/common.reducer';
import { CommonType, MessageType } from '../../../type/store/common';
import { createSelector } from '@reduxjs/toolkit';

// select state
export const selectState = (state: any) => state[name];

/**
 * get common
 */
export const selectCommon = createSelector(selectState, (state: CommonType) => state);

/**
 * get message queue
 */
export const selectMessageQueue = createSelector(
    selectState,
    (state: CommonType): MessageType[] => state.messageQueue
);

/**
 * get loading page
 */
export const selectLoading = createSelector(
    selectState,
    (state: CommonType): boolean => state.loadingPage
);
