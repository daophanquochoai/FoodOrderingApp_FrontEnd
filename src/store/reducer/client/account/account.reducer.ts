import { initAccount } from '@/defaultValue/client/account/account';
import { selectLoadingComponent } from '@/store/selector/admin/food/food_manager.selector';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'account';

const AccountSlice = createSlice({
    name,
    initialState: initAccount,
    reducers: {
        setLoading(state, { payload }: PayloadAction<any>) {
            state.loading = payload;
        },
        setAddress(state, { payload }: PayloadAction<any>) {
            state.address.data = payload;
        },
        setInfo(state, { payload }: PayloadAction<any>) {
            state.info = payload;
        },
        selectLoadingComponent(state, { payload }: PayloadAction<any>) {
            state.loadingComponent = payload;
        },
        setLoadingAddress(state, { payload }: PayloadAction<any>) {
            state.address.loading = payload;
        },
        setTotalPageAddress(state, { payload }: PayloadAction<any>) {
            state.address.totalPage = payload;
        },
        setFilterAddress(state, { payload }: PayloadAction<any>) {
            state.address.filter = payload;
        },
    },
});

export const { actions } = AccountSlice;
export default AccountSlice;
