import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../api/axios'

const initialState = []

export const get_users = createAsyncThunk(
    'conversations/get_user',
    async ( credentials, { rejectWithValue } ) => {
        try {
            const response = await axios.get('/user', {headers: { Authorization: `Bearer ${credentials.token}` }}, )
            return response.data
        } catch (err) {
            if(err.response){
                return rejectWithValue(err.response.data)
            }
            
            if(err.request){
                return rejectWithValue({ success: false, message: 'Internal Server Error'})
            }

            return rejectWithValue({ success: false, message: err.message })
        }
    }
)

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(get_users.fulfilled, (state, action) => {
            return action.payload.users
        })
        .addCase(get_users.rejected, () => {
            return []
        })
    }
})

export default conversationsSlice.reducer