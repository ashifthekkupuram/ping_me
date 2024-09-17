import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import AuthRouter from './routes/auth.route.js'

import { CONNECT_DB } from './config/database.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

// Express App configuration
app.use(express.json())
app.use(cookieParser())

//API routes
app.use('/api/auth/', AuthRouter)

app.listen(PORT, async () => {
    await CONNECT_DB()
    console.log(`Server runs on ${PORT}`)
})