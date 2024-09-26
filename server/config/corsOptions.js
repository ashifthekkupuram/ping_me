import dotenv from 'dotenv'

dotenv.config()

const allowedOrigins = process.env.ALLOWED_ORIGINS || []

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.split(' ').indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

export default corsOptions 