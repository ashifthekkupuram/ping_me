import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Conversation from '../models/coversation.model.js'
import Message from '../models/message.model.js'
import User from '../models/user.model.js'

import { io, getReceiverSocketId } from '../socket/socket.js'

export const get_coversation = async (req, res, next) => {
    try{

        const { userId } = req.params

        const senderId = jwt.verify(req.token, process.env.ACCESS_SECRET_KEY)._Id

        if(!senderId || !userId){
            return res.status(400).json({
                success: false,
                message: 'Users Id required'
            })
        }

        let conversation = await Conversation.findOne({
			participants: { $all: [senderId, userId] },
		}).populate("messages")

        if(!conversation){

            conversation = await Conversation.create({
				participants: [senderId, userId],
			})

            await conversation.save()

            conversation = await Conversation.findOne({
                participants: { $all: [senderId, userId] },
            }).populate("messages")
        }

        const user = await User.findById(userId).select('-password')

        return res.json({
            success: true,
            message: 'Messages retrieved',
            messages: conversation.messages,
            user: {
                _id: user._id,
                name: user.name
            },
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const post_coversation = async (req, res, next) => {
    try{

        const { message } = req.body
        const { userId } = req.params

        const senderId = jwt.verify(req.token, process.env.ACCESS_SECRET_KEY)._Id

        if(!senderId || !userId || !message){
            return res.status(400).json({
                success: false,
                message: 'Users Id and message required'
            })
        }

        const [userExist, receiverExist] = await Promise.all([
            User.findById(senderId),
            User.findById(userId),
        ])

        if(!userExist || !receiverExist){
            return res.status(400).json({
                success: false,
                message: 'User not longer exist'
            })
        }

        let conversation = await Conversation.findOne({
			participants: { $all: [senderId, userId] },
		})

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, userId],
			})
		}

        const newMessage = new Message({
            sender: senderId,
            receiver: userId,
            message,
        })

        if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        if(!userExist.conversations.includes(receiverExist._id)){
            userExist.conversations.push(receiverExist)
        }

        if(!receiverExist.conversations.includes(userExist._id)){
            receiverExist.conversations.push(userExist)
        }

        await Promise.all([
            conversation.save(),
            newMessage.save(),
            userExist.save(),
            receiverExist.save()
        ])

        // Socket yet to setup
        const receiverSocketId = getReceiverSocketId(userId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit('sendMessage', newMessage)
        }

        return res.json({
            success: true,
            message: 'Message sent',
            newMessage
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