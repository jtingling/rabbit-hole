import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store';

interface User {
    id: string,
    userName: string,
}

const initialState = {
    id: 'abc',
    userName: 'jtingling',
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        currentUser(state: User, action: PayloadAction<User>) {
            state = action.payload
        },
    }
})

export const { currentUser } = usersSlice.actions;
export default usersSlice.reducer;
export const selectUser = (state: RootState) => state;