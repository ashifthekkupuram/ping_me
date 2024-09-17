import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const CONNECT_DB =  async () => {
    try{
        mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected...')
    }catch(err){
        console.log(err)
    }
}