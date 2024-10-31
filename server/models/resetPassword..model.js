import mongoose from 'mongoose'
import { v4 } from 'uuid'

const Schema = mongoose.Schema

const ResetPasswordSchema = new Schema({
    token: {
        type: String,
        default: v4,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    expired: {
        type: Boolean,
        default: false
    }
}, { timestamps: true})

export default mongoose.model('ResetPassword', ResetPasswordSchema)