import mongoose from 'mongoose'
import { v4 } from 'uuid'

const Schema = mongoose.Schema

const VerificationSchema = new Schema({
    token: {
        type: String,
        default: v4
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expired: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Verification', VerificationSchema)