import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'

import axios from '../../api/axios'

const initialState = {
    user: null,
    conversation: [],
    loading: false,
    error: null
}

export const get_conversation = createAsyncThunk(
    'conversation/get_conversation',
    async ( credentials, { rejectWithValue } ) => {
        try {
            const response = await axios.get(`/conversation/${credentials.userId}/` )
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
    reducers: {
        sendMessage: (state, action) => {
            state.conversation = [...state.conversation, action.payload]
        },
        deleteMessageFromMe: (state, action) => {
            const idsToRemove = new Set(action.payload)
            state.conversation = state.conversation.filter((i) => !idsToRemove.has(i._id))
        },
        deleteMessageFromEveryone: (state, action) => {
            const idsToDelete = new Set(action.payload)
            state.conversation = state.conversation.map((i) => idsToDelete.has(i._id) ? {...i, deleted: true} : i)
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_conversation.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(get_conversation.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.conversation = action.payload.messages
            state.error = null
            state.loading = false
        })
        .addCase(get_conversation.rejected, (state, action) => {
            state.user = null
            state.conversation = []
            state.error = action.payload?.message || 'An error occured'
            state.loading = false
        })
    }
})

export const { sendMessage, deleteMessageFromMe, deleteMessageFromEveryone } = conversationSlice.actions

export default conversationSlice.reducer