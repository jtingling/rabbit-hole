import { createSlice, nanoid, PrepareAction, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

interface Articles {
    id: string,
    articles: Article[]
}

export interface Article {
    id: string,
    image: string,
    title: string,
    stub: string,
    url: string,
    publishDate: string,
}

const initialState: Articles = {
    id: "def",
    articles: []
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addArticle(state: Articles, action: PayloadAction<Article>) {
            state.articles.push(action.payload)
        },
        removeArticle(state: Articles, action: PayloadAction<string>) {
            let idx = state.articles.findIndex(article => article.id === action.payload)
            state.articles.map( article => article.id === action.payload && state.articles.splice(idx, 1));
        }
    }
})
export const { addArticle, removeArticle } = articleSlice.actions;
export default articleSlice.reducer;
export const selectAllArticles = (state: RootState) => state.article;
export const selectArticleById = (state: RootState, id: string) => state.article.articles.find(state => state.id === id)