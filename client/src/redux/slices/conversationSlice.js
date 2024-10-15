import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'

import axios from '../../api/axios'

const initialState = {
    id: null,
    conversation: []
}

export const get_conversation = createAsyncThunk(
    'conversation/get_conversation',
    async ( credentials, { rejectWithValue } ) => {
        try {
            const response = await axios.get(`/conversation/${credentials.userId}`, { headers: { authorization: `Bearer ${credentials.token}` } })
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

const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(get_conversation.fulfilled, (state, action) => {
            // To be added
        })
        .addCase(get_conversation.rejected, (state, action) => {
            // To be added
        })
    }
})

export default conversationSlice.reducer