import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res, next) => {
    return res.json({
        success: 'true',
        message: 'Ping me API works!!!'
    })
})

app.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`)
})