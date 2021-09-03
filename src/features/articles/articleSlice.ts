import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

interface Articles {
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

const initialState: Articles = {
    articles: []
}

const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        addArticle(state: Articles, action: PayloadAction<Article>) {
            state.articles.push(action.payload)
        },
        setArticles(state: Articles, action: PayloadAction<[]>) {
            state.articles = action.payload
        },
        removeArticle(state: Articles, action: PayloadAction<string>) {
            let idx = state.articles.findIndex(article => article.articleId === action.payload)
            state.articles.map( article => article.articleId === action.payload && state.articles.splice(idx, 1));
        }
    }
})
export const { addArticle, removeArticle, setArticles } = articleSlice.actions;
export default articleSlice.reducer;
export const selectAllArticles = (state: RootState) => state.article;
export const selectArticleById = (state: RootState, userId: string) => state.article.articles.find(state => state.articleId === userId)