import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        newUser(state: User, action: PayloadAction<User>) {
            state = action.payload
        },
    }
})

export const { newUser } = usersSlice.actions;
export default usersSlice.reducer;