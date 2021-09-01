import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

export interface Articles {
    userId: string,
    articles: Article[]
}

export interface Article {
    articleId: string,
    image: string,
    title: string,
    stub: string,
    url: string,
    publishDate: string,
    userId: string,
}

export const initialState: Articles = {
    userId: "",
    articles: []
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addId(state: Articles, action: PayloadAction<string>) {
            state.userId = action.payload;
        },
        addArticle(state: Articles, action: PayloadAction<Article>) {
            state.articles.push(action.payload)
        },
        setArticles(state: Articles, action: PayloadAction<Articles>) {
            state = action.payload
        },
        removeArticle(state: Articles, action: PayloadAction<string>) {
            let idx = state.articles.findIndex(article => article.articleId === action.payload)
            state.articles.map( article => article.articleId === action.payload && state.articles.splice(idx, 1));
        }
    }
})
export const { addArticle, removeArticle, addId, setArticles } = articleSlice.actions;
export default articleSlice.reducer;
export const selectAllArticles = (state: RootState) => state.article;
export const selectId = (state: RootState) => state.article.userId;
export const selectArticleById = (state: RootState, id: string) => state.article.articles.find(state => state.articleId === id)