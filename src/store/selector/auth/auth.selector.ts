import { createSelector } from '@reduxjs/toolkit';
import { name } from '../../reducer/auth';
import { AuthState } from '@/type/store/auth/authSlide';

// selectors
export const selectState = (state: any) => state[name];

/**
 * get auth
 */
export const selectAuth = createSelector(selectState, (state: AuthState) => state);

/**
 * get username
 */
export const selectUsername = createSelector(selectState, (state: AuthState) => state.username);

/**
 * get password
 */
export const selectPassword = createSelector(selectState, (state: AuthState) => state.password);

/**
 * get loading
 */
export const selectLoading = createSelector(selectState, (state: AuthState) => state.loading);

/**
 * get error
 */
export const selectError = createSelector(selectState, (state: AuthState) => state.error);
