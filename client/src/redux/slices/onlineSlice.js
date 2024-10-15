import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    socket: null,
    users: []
}

const onlineSlice = createSlice({
    name: 'online',
    initialState,
    reducers: {
        setOnline: (state, action) => { state.users = action.payload },
        setSocket: (state, action) => { state.socket = action.payload }, 
    }
})

export const { setOnline, setSocket } = onlineSlice.actions

export default onlineSlice.reducer