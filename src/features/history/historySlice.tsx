import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';
import { Search } from '../articles/searchSlice'

interface IHistory {
    searches: Search[]
}

const initialState: IHistory = {
    searches: []
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addKeyword(state: IHistory, action: PayloadAction<Search>) {
            state.searches.push(action.payload);
        },
        removeKeyword(state: IHistory, action: PayloadAction<Search>) {
            let idx = state.searches.findIndex(word => word.query === action.payload.query);
            state.searches.map(word => word.query === action.payload.query && state.searches.splice(idx, 1));
        }
    }
})

export const { addKeyword, removeKeyword } = historySlice.actions;
export default historySlice.reducer;
export const selectAllWords = (state: RootState) => state.history;