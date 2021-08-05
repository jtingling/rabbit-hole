import { createSlice, nanoid, PrepareAction, PayloadAction } from "@reduxjs/toolkit";
import { List } from '../lists/listSlice'

interface User {
    id: string,
    userName: string,
    listIds: List[]
}
const initialState = {
    id: '',
    userName: '',
    listIds: []
}
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        newUser(state: User, action: PayloadAction<User>) {
            state = action.payload
        }
    }
})

export const { newUser } = usersSlice.actions;
export default usersSlice.reducer;