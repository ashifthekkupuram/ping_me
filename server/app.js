import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import AuthRouter from './routes/auth.route.js'
import ConversationRouter from './routes/conversation.route.js'
import UserRouter from './routes/user.route.js'

import { CONNECT_DB } from './config/database.js'
import corsOptions from './config/corsOptions.js'

import { app, server } from './socket/socket.js'

dotenv.config()

const PORT = process.env.PORT || 5000

// Express App configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

//API routes
app.use('/api/auth', AuthRouter)
app.use('/api/coversation', ConversationRouter)
app.use('/api/user', UserRouter)

server.listen(PORT, async () => {
    await CONNECT_DB()
    console.log(`Server runs on ${PORT}`)
})