import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/user.model.js'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY

export const get_users = async (req, res, next) => {
    try{

        const user = await jwt.verify(req.token, ACCESS_SECRET_KEY)

        const myUser = await User.findById(user._Id)

        if(!myUser){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const filteredUsers = await User.find({_id: { $ne: myUser._id }}).select('-password -username')

        return res.json({
            success: true,
            message: 'Users retrieved',
            users: filteredUsers
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