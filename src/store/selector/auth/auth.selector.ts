import { createSelector } from '@reduxjs/toolkit';
import { name } from '../../reducer/auth';
import { AuthState } from '@/type/store/auth/authSlide';

// selectors
export const selectState = (state: any) => state[name];

/**
 * get auth
 */
export const selectAuth = (state: any): AuthState => state[name];

/**
 * get loading
 */
export const selectLoading = createSelector(selectState, (state: AuthState) => state.loading);

/**
 * get error
 */
export const selectError = createSelector(selectState, (state: AuthState) => state.error);
