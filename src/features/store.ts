import { configureStore } from "@reduxjs/toolkit";
import listsReducer  from './lists/listSlice'
import UsersReducer from './users/usersSlice'
import searchSlice from './articles/searchSlice'

export const store = configureStore({
    reducer: {
        lists: listsReducer,
        users: UsersReducer,
        search: searchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch