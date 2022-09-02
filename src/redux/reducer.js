import {createSlice} from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'hello',
    initialState: {
        data: []
    },
    reducers: {
        addData: (state, action) => {
            state.data.push(action.payload);
        },
        clearData: (state) => {
            state.data = [];
        }
    },
});

export const {addData, clearData} = counterSlice.actions;

export default counterSlice.reducer;
