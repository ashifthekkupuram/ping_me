import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from '../../api/axios'

const initialState = {
    token: '',
    UserData: {}
}

export const login = createAsyncThunk(
    'auth/login',
    async ( credentials, { rejectWithValue } ) => {
        try {
            const response = await axios.post('/auth/login/', {...credentials})
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

export const refresh = createAsyncThunk(
    'auth/refresh',
    async ( credentials, { rejectWithValue } ) => {
        try {
            const response = await axios.post('/auth/refresh/')
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

export const logout = createAsyncThunk(
    'auth/logout',
    async ( credentials, {rejectWithValue} ) => {
        try{
            const response = await axios.post('/auth/logout')
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.UserData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.accessToken
            state.UserData = action.payload.userData
        })
        .addCase(login.rejected, (state) => {
            state.token = ''
            state.UserData = {}
        })
        .addCase(refresh.fulfilled, (state, action) => {
            state.token = action.payload.accessToken
            state.UserData = action.payload.userData
        })
        .addCase(refresh.rejected, (state) => {
            state.token = ''
            state.UserData = {}
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.token = ''
            state.UserData = {}
        })
        .addCase(logout.rejected, () => {
           // Do nothing for now
        })
    }
})

export const { updateUserData } = authSlice.actions

export default authSlice.reducer