import { createSlice, nanoid, PrepareAction, PayloadAction } from "@reduxjs/toolkit";

interface Lists {
    list: List[]
}

export interface List {
    id: string,
    name: string,
    keyWordList: string[]
}

interface keyword {
    id: string,
    keyWord: string
}

const initialState: Lists = {
    list: []
}

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        newList(state: Lists, action: PayloadAction<List>) {
            state.list.push(action.payload)
        },
        addKeyWord(state: Lists, action: PayloadAction<keyword>) {
            state.list.map( list => list.id === action.payload.id && list.keyWordList.push(action.payload.keyWord))
        },
        removeKeyword(state: Lists, action: PayloadAction<keyword>) {
            let idx = state.list.findIndex(list => list.id === action.payload.id)
            state.list.map( list => list.id === action.payload.id && list.keyWordList.splice(idx, 0));
        },
        deleteList(state: Lists, action: PayloadAction<String>) {
            let index = state.list.findIndex(list => list.id === action.payload);
            state.list.splice(index, 0);
        }
    }
})
export const { newList, addKeyWord, removeKeyword, deleteList } = listSlice.actions;
export default listSlice.reducer;
export const selectListsById = (lists: Lists, singleList: List) => lists.list.find(list => list.id === singleList.id)