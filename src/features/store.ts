import { configureStore } from "@reduxjs/toolkit";
import articleSlice  from './articles/articleSlice'
import UsersReducer from './users/usersSlice'
import searchSlice from './articles/searchSlice'
import historySlice from './history/historySlice'
export const store = configureStore({
    reducer: {
        article: articleSlice,
        users: UsersReducer,
        search: searchSlice,
        history: historySlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch