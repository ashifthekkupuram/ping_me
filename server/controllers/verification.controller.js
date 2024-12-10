import Verification from '../models/verification.model.js'
import User from '../models/user.model.js'

export const get_verification = async (req, res, next) => {
    try{
        
        const { token } =  req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            })
        }

        const verification = await Verification.findOne({ token })
        const user = await User.findById(verification.user)

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Account is not found'
            })
        }

        if(verification.expired){
            return res.status(400).json({
                success: false,
                message: 'Verification expired'
            })
        }

        if(user.verified){

            await Verification.updateMany({ user: user._id }, { expired: true })

            return res.status(400).json({
                success: false,
                message: 'Account is already verified'
            })
        }

        return res.json({
            success: false,
            message: 'Token is valid'
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const post_verification = async (req, res, next) => {
    try{
        
        const { token } =  req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            })
        }

        const verification = await Verification.findOne({ token })
        const user = await User.findById(verification.user)

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Account is not found'
            })
        }

        if(verification.expired){
            return res.status(400).json({
                success: false,
                message: 'Verification expired'
            })
        }

        if(user.verified){

            await Verification.updateMany({ user: user._id }, { expired: true })

            return res.status(400).json({
                success: false,
                message: 'Account is already verified'
            })
        }else{

            await Promise.all([
                await User.findByIdAndUpdate(user._id, { verified: true }),
                await Verification.updateMany({ user: user._id }, { expired: true })
            ])

            return res.json({
                success: true,
                message: 'Account has been verified'
            })

        }

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const delete_verification = async (req, res, next) => {
    try{
        
        const { token } =  req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            })
        }

        const verification = await Verification.findOne({ token })
        const user = await User.findById(verification.user)

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Account is not found'
            })
        }

        if(verification.expired){
            return res.status(400).json({
                success: false,
                message: 'Verification expired'
            })
        }

        if(user.verified){

            await Verification.updateMany({ user: user._id }, { expired: true })

            return res.status(400).json({
                success: false,
                message: 'Account is already verified'
            })
        }else{

            await Promise.all([
                await User.findByIdAndDelete(user._id),
                await Verification.updateMany({ user: user._id }, { expired: true })
            ])

            return res.json({
                success: true,
                message: 'Account has been deleted'
            })

        }

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}