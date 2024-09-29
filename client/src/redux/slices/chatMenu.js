import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const chatMenuSlice = createSlice({
    name: 'chatMenu',
    initialState,
    reducers: {
        toggleMenu: (state) => state = !state
    }
})

export const { toggleMenu } = chatMenuSlice.actions

export default chatMenuSlice.reducer