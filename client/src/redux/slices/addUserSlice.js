import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    result: null
}

const addUserSlice = createSlice({
    name: 'addUser',
    initialState,
    reducers: {
        setAddUser: (state, action) => {
            state.open = action.open || false
            state.result = action.result || null
        }
    }
})

export const { setAddUser } = addUserSlice.actions

export default addUserSlice.reducer