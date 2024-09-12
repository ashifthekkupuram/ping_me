import express from 'express'
import dotenv from 'dotenv'

import AuthRouter from './routes/auth.route.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

// Express App configuration
app.use(express.json())

//API routes
app.use('/api/auth/', AuthRouter)

app.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`)
})