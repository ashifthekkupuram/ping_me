import dotenv from 'dotenv'

import ResetPassword from '../models/resetPassword..model.js'
import User from '../models/user.model.js'
import transporter from '../utils/mail.js'

dotenv.config()

export const get_reset_password = async (req, res, next) => {
    try{

        const { token } = req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            })
        }

        const resetToken = await ResetPassword.findOne({ token, })
        
        if(!resetToken){
            return res.status(400).json({
                success: false,
                message: 'Invalid token'
            })
        }

        if(resetToken.expired){
            return res.status(400).json({
                success: false,
                message: 'Reset Password token expired'
            })
        }

        return res.json({
            success: true,
            message: 'Valid token!'
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const post_reset_password = async (req, res, next) => {
    try{

        const { email } = req.body
        
        if(!email){
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            })
        }

        const user = await User.findOne({ email: email.toLowerCase() })

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User don't exist"
            })
        }

        const tokens = await ResetPassword.find({ user })

        if(tokens){
            await ResetPassword.updateMany({ user }, { expired: true })
        }

        const resetToken = new ResetPassword({
            user,
        })

        await resetToken.save()

        const url = process.env.ALLOWED_ORIGINS.split(' ')

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email.toLowerCase(),
            subject: 'Ping Me - Reset Password',
            text: 'reset password',
            html: `<a href='${url[0]}/reset-password-confirm/${resetToken.token}'>Click here to reset<a/>`
        })

        return res.json({
            success: true,
            message: 'Check your email to reset password'
        })

    } catch(err) {

        console.log(err)

        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}