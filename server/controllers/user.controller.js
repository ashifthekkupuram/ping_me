import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'

export const get_users = async (req, res, next) => {
    try{

        const user = await User.findById(jwt.decode(req.user)._id)

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const filteredUsers = await User.find({_id: { $ne: user_id }}).select('-password -username')

        return res.json({
            success: true,
            message: 'Users retrieved',
            users: filteredUsers
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}