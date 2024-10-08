import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import Conversation from '../models/coversation.model.js'
import Message from '../models/message.model.js'
import User from '../models/user.model.js'

export const get_coversation = async (req, res, next) => {
    try{

        const { userId } = req.params

        const senderId = jwt.verify(req.token, process.env.ACCESS_SECRET_KEY)._id

        if(!senderId || !userId){
            return res.status(400).json({
                success: false,
                message: 'Users Id required'
            })
        }

        const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userId] },
		}).populate("messages")

        if(!conversation){
            return res.json({
                success: true,
                message: 'Chat yet to start',
                messages: []
            })
        }

        return res.json({
            success: true,
            message: 'Messages retrieved',
            messages: conversation.messages
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

        const senderId = jwt.verify(req.token, process.env.ACCESS_SECRET_KEY)._id

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
				participants: [senderId, receiverId],
			})
		}

        const newMessage = new Message({
            sender: senderId,
            receiver: userId
        })

        if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        await Promise.all([
            conversation.save(),
            newMessage.save()
        ])

        // Socket yet to setup

        return res.json({
            success: true,
            message: 'Message sent'
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}