import { createSlice } from '@reduxjs/toolkit'

const initialState = true

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleTheme: (state) => state = !state
    }
})

export const { toggleTheme } = darkModeSlice.actions

export default darkModeSlice.reducer