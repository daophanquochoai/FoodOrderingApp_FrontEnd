import { createSelector } from "@reduxjs/toolkit";
import { name } from "../../reducer/auth";
import { RootReducerType } from "../../reducer/rooReducer";
import { AuthState } from "../../../type";


// selectors
export const selectState = ( state : RootReducerType) => state[name];

/**
 * get auth
 */
export const selectAuth = createSelector(
    selectState,
    (state : AuthState) => state
);