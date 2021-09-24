import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

interface IHistory {
    searches: IQueryData[]
}

export interface IQueryData {
    searchWord: string,
    date: string,
    searchType: string,
}

const initialState: IHistory = {
    searches: [{searchWord:"NULL", date:'none', searchType:'none'}]
}

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addKeyword(state: IHistory, action: PayloadAction<IQueryData>) {
            state.searches.push(action.payload);
        },
        removeKeyword(state: IHistory, action: PayloadAction<IQueryData>) {
            let idx = state.searches.findIndex(word => word === action.payload);
            state.searches.map(word => word === action.payload && state.searches.splice(idx, 1));
        }
    }
})

export const { addKeyword, removeKeyword } = historySlice.actions;
export default historySlice.reducer;
export const selectAllWords = (state: RootState) => state.history;