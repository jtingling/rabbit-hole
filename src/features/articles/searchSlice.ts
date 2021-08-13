import { createSlice, PrepareAction, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

export interface Search {
    query: string,
    url: string,
    similarUrl: string,
}

const initialState: Search = {
    query: '',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI',
    similarUrl: 'https://keyword-analysis.p.rapidapi.com/api/query/SimilarQueries'
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        query(state: Search, action: PayloadAction<Search>) {
            const { query, url } = action.payload
            state.query = query;
            state.url = url;
        },
        updateUrl(state: Search, action: PayloadAction<string>) {
            state.url = action.payload;
        },
        updateQuery(state: Search, action: PayloadAction<string>) {
            state.query = action.payload;
        }
    }
})

export const { query, updateUrl, updateQuery } = searchSlice.actions;
export const getQuery = (state: RootState ) => state.search.query;
export const getUrl = (state: RootState) => state.search.url;
export const getSimilarUrl = (state: RootState) => state.search.similarUrl;
export default searchSlice.reducer;
