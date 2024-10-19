import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/user.model.js'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY

export const find_user = async (req, res, next) => {
    try{
        const { username } = req.params

        const user = await User.findById(jwt.verify(req.token, ACCESS_SECRET_KEY)._id)

        const foundUser = await User.findOne({
            username: username.toLowerCase(),
        }).select('-password')

        if(!foundUser){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        if(user.conversations.includes(foundUser._id)){
            return res.json({
                success: true,
                message: 'User already in your conversations',
                user: foundUser
            })
        }

        return res.json({
            success: true,
            message: 'User found',
            user: foundUser
        })

    } catch(err) {

    }
}

export const get_users = async (req, res, next) => {
    try{

        const user = await jwt.verify(req.token, ACCESS_SECRET_KEY)

        const myUser = await User.findById(user._Id).populate('conversations','password')

        if(!myUser){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        // const filteredUsers = await User.find({_id: { $ne: myUser._id }}).select('-password -username')
        const conversations = myUser.conversations

        return res.json({
            success: true,
            message: 'Users retrieved',
            users: conversations
        })

    } catch (err) {

        console.log(err)

        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}