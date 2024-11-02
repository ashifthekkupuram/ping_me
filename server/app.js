import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

import AuthRouter from './routes/auth.route.js'
import ConversationRouter from './routes/conversation.route.js'
import UserRouter from './routes/user.route.js'
import ResetPasswordRouter from './routes/resetPassword.route.js'
import VerificationRouter from './routes/verification.route.js'

import { CONNECT_DB } from './config/database.js'
import corsOptions from './config/corsOptions.js'
import getDirName from './utils/getDirName.js'

import { app, server } from './socket/socket.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const _dirname = getDirName(import.meta.url)
const uploadsDir = path.join(_dirname, 'images')
if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir)
}

// Express App configuration
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/images', express.static(uploadsDir))

//API routes
app.use('/api/auth', AuthRouter)
app.use('/api/conversation', ConversationRouter)
app.use('/api/user', UserRouter)
app.use('/api/reset', ResetPasswordRouter)
app.use('/api/verification', VerificationRouter)

server.listen(PORT, async () => {
    await CONNECT_DB()
    console.log(`Server runs on ${PORT}`)
})