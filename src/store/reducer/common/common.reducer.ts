import { initCommonValue } from '@/defaultValue/common';
import { CommonType } from '@/type/store/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'common';

const commonSlice = createSlice({
    name,
    initialState: initCommonValue,
    reducers: {
        removeMessageQuue(state, { payload }: PayloadAction<string>) {
            state.messageQueue = state.messageQueue.filter((i) => i.id != payload);
        },
        markMessageAsShown(state, { payload }: PayloadAction<string>) {
            const message = state.messageQueue.find((msg) => msg.id === payload);
            if (message) {
                message.hasShow = true;
            }
        },
        setErrorMessage(state, action: PayloadAction<string>) {
            addMessage(state, action.payload, 'error');
        },

        setWarningMessage(state, action: PayloadAction<string>) {
            addMessage(state, action.payload, 'warning');
        },

        setSuccessMessage(state, action: PayloadAction<string>) {
            addMessage(state, action.payload, 'success');
        },

        setNotificationMessage(state, action: PayloadAction<string>) {
            addMessage(state, action.payload, 'info');
        },
        setLoading(state, { payload }: PayloadAction<boolean>) {
            state.loadingPage = payload;
        },
    },
});

const addMessage = (
    state: CommonType,
    message: string,
    status: 'success' | 'info' | 'warning' | 'error'
) => {
    state.messageQueue.push({
        id: Date.now().toString(),
        message,
        status,
        hasShow: false,
    });
};

export const { actions } = commonSlice;

export default commonSlice;
