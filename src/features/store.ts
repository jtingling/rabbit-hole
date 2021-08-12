import { configureStore } from "@reduxjs/toolkit";
import articleSlice  from './articles/articleSlice'
import UsersReducer from './users/usersSlice'
import searchSlice from './articles/searchSlice'

export const store = configureStore({
    reducer: {
        article: articleSlice,
        users: UsersReducer,
        search: searchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch