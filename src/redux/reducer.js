import {createSlice} from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        username: '',
        id: '',
        cards: [],
        opponentCards: [],
        opponentCardCount: 0
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

export const {addData, clearData} = gameSlice.actions;

export default gameSlice.reducer;
