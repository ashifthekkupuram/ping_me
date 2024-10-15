import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'

import axios from '../../api/axios'

const initialState = {
    id: null,
    conversation: [],
    loading: false,
    error: null
}

export const get_conversation = createAsyncThunk(
    'conversation/get_conversation',
    async ( credentials, { rejectWithValue } ) => {
        try {
            const response = await axios.get(`/coversation/${credentials.userId}/`, { headers: { authorization: `Bearer ${credentials.token}` } })
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
        .addCase(get_conversation.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(get_conversation.fulfilled, (state, action) => {
            state.id = action.payload.userId
            state.conversation = action.payload.messages
            state.error = null
            state.loading = false
        })
        .addCase(get_conversation.rejected, (state, action) => {
            state.id = null
            state.conversation = []
            state.error = action.payload?.message || 'An error occured'
            state.loading = false
        })
    }
})

export default conversationSlice.reducer