import { configureStore } from "@reduxjs/toolkit";
import listsReducer  from './lists/listSlice'
import UsersReducer from './users/usersSlice'

export default configureStore({
    reducer: {
        lists: listsReducer,
        users: UsersReducer
    }
})