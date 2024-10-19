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
        unique: true,
        default: 'defaultName'
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
    conversations: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
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

UserSchema.pre('save', async function(next){
    const user = this

    if (!user.isModified('email')) return next()

    try{
        const baseUsername = user.email.split('@')[0]
        let username = baseUsername
        let counter = 1

        const User = mongoose.model('User', UserSchema);

        while(await User.exists({ username })){
            username = `${baseUsername}${counter}`
            counter++
        }

        user.username = username
        next()

    }catch(err){
        next(err)
    }

})

export default mongoose.model('User', UserSchema)