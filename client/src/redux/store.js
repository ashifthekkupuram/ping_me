import { configureStore } from '@reduxjs/toolkit'
import { setStore } from '../api/axios'

import authReducer from './slices/authSlice'
import darkModeReducer from './slices/darkModeSlice'
import chatMenuReducer from './slices/chatMenu'
import conversationsReducer from './slices/conversationsSlice'
import onlineReducer from './slices/onlineSlice'
import conversationReducer from './slices/conversationSlice'
import addUserReducer from './slices/addUserSlice'

export const store = configureStore({
    reducer: {
       auth: authReducer,
       darkMode: darkModeReducer,
       chatMenu: chatMenuReducer,
       conversations: conversationsReducer,
       online: onlineReducer,
       conversation: conversationReducer,
       addUser: addUserReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
})

setStore(store)