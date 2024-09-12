import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        firstName: {
            type: String,
            required: true,
            minLength: 2
        },
        secondName: {
            type: String,
            required: true,
            minLength: 2
        }
    },
    bio: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('User', UserSchema)