import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ConversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }]
}, { timestamps: true })

export default mongoose.model('Conversation', ConversationSchema)