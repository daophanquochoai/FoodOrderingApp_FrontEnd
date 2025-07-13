import { createSlice } from "@reduxjs/toolkit";
import { initAutDefault } from "../../../defaultValue/auth";

export const name = "auth";


const authSlicer = createSlice({
    name,
    initialState: initAutDefault,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
    },
});

export default authSlicer.reducer;