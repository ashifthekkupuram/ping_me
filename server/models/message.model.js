import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        minLength: 1,
        required: true
    }
},{ timestamps: true })

export default mongoose.model('Message', MessageSchema)