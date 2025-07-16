import { createSelector } from "@reduxjs/toolkit";
import { name } from "../../reducer/auth";
import { AuthState } from "../../../type";


// selectors
export const selectState = ( state : any) => state[name];

/**
 * get auth
 */
export const selectAuth = createSelector(
    selectState,
    (state : AuthState) => state
);