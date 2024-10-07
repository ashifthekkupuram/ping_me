import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import darkModeReducer from './slices/darkModeSlice'
import chatMenuReducer from './slices/chatMenu'
import conversationsReducer from './slices/conversationsSlice'

export const store = configureStore({
    reducer: {
       auth: authReducer,
       darkMode: darkModeReducer,
       chatMenu: chatMenuReducer,
       conversations: conversationsReducer
    }
})