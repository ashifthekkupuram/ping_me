import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/

export const find_user = async (req, res, next) => {
    try{
        const { username } = req.params

        const user = await User.findById(jwt.verify(req.token, ACCESS_SECRET_KEY)._Id)

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
            return res.status(400).json({
                success: false,
                message: `User already in your conversations as ${foundUser.name.firstName} ${foundUser.name.secondName}`,
            })
        }

        return res.json({
            success: true,
            message: 'User found',
            user: foundUser
        })

    } catch(err) {

        return res.status(400).json({
            success: false,
            message: 'Something went wrongg',
            error: err
        })
    }
}

export const get_users = async (req, res, next) => {
    try{

        const user = jwt.verify(req.token, ACCESS_SECRET_KEY)

        const myUser = await User.findById(user._Id).populate('conversations','-password')

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

export const update_name = async (req, res, next) => {
    try{

        const { name } = req.body

        if(!name){
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            })
        }

        const user = jwt.verify(req.token, ACCESS_SECRET_KEY)

        const myUser = await User.findById(user._Id)

        if(!myUser){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(user._Id, { name: { firstName: name.firstName.toLowerCase(), secondName: name.secondName.toLowerCase() } }, { new:  true })

        console.log(updatedUser)

        return res.json({
            success: true,
            message: 'User name updated',
            updatedUser: {
                _id: updatedUser._id,
                email: updatedUser.email,
                username: updatedUser.username,
                name: updatedUser.name,
                bio: updatedUser.bio,
                profile: updatedUser.profile
            }
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

export const update_username = async (req, res, next) => {
    try{

        const { username } = req.body

        if(!username){
            return res.status(400).json({
                success: false,
                message: 'Username is required'
            })
        }

        const user = jwt.verify(req.token, ACCESS_SECRET_KEY)

        const myUser = await User.findById(user._Id)

        if(!myUser){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const usernameExist = await User.findOne({ username, _id: {
            $ne: myUser._id
        } })

        if(usernameExist){
            return res.status(400).json({
                success: false,
                message: 'Username already exist'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(user._Id, { username }, { new: true })

        return res.json({
            success: true,
            message: 'User username updated',
            updatedUser: {
                _id: updatedUser._id,
                email: updatedUser.email,
                username: updatedUser.username,
                name: updatedUser.name,
                bio: updatedUser.bio,
                profile: updatedUser.profile
            }
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const change_password = async (req, res, next) => {
    try{

        const { oldPassword, newPassword } = req.body

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message: 'Old Password and New Password is required'
            })
        }

        const user = jwt.verify(req.token, ACCESS_SECRET_KEY)

        const myUser = await User.findById(user._Id)

        if(!myUser){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const match = bcrypt.compareSync(oldPassword, myUser.password)

        if(match){

            if(!newPassword.match(PASSWORD_REGEX)){
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Password'
                })
            }

            bcrypt.hash(newPassword, 12, async (err, hashedPassword) => {
                if(err){
                    return res.status(400).json({
                        success: false,
                        message: 'Something went wrong',
                        error: err
                    })
                }else{
                    await User.findByIdAndUpdate(user._Id, { password: hashedPassword })

                    return res.json({
                        success: true,
                        message: 'Password Changed'
                    })

                }
            })

        }else{
            return res.status(400).json({
                success: false,
                message: 'Enter the correct Old Password'
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

export const add_profile = async (req, res, next) => {
    try{

        const profile = req.file

        const user = jwt.verify(req.token, ACCESS_SECRET_KEY)

        const myUser = await User.findById(user._Id)

        if(!myUser){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(user._Id, { profile: profile.filename }, { new: true })

        return res.json({
            success: true,
            message: 'Profile added',
            updatedUser: {
                _id: updatedUser._id,
                email: updatedUser.email,
                username: updatedUser.username,
                name: updatedUser.name,
                bio: updatedUser.bio,
                profile: updatedUser.profile
            }
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const remove_profile = async (req, res, next) => {
    try{

        const user = jwt.verify(req.token, ACCESS_SECRET_KEY)

        const myUser = await User.findById(user._Id)

        if(!myUser){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(user._Id, { profile: '' }, { new: true })

        return res.json({
            success: true,
            message: 'Profile removed',
            updatedUser: {
                _id: updatedUser._id,
                email: updatedUser.email,
                username: updatedUser.username,
                name: updatedUser.name,
                bio: updatedUser.bio,
                profile: ''
            }
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}