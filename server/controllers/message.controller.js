import jwt from 'jsonwebtoken'

import Message from '../models/message.model.js'
import { io, getReceiverSocketId } from '../socket/socket.js'

export const delete_message_from_me = async (req, res, next) => {
    try {

        const { messages_id } = req.body

        const user_id = jwt.verify(req.token, process.env.ACCESS_SECRET_KEY)._Id

        await Message.updateMany({ _id: { $in: messages_id } }, { $push: { delete_from: user_id } })

        return res.json({
            success: true,
            message: 'Messages Deleted',
            deleted_messages: messages_id
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const delete_message = async (req, res, next) => {
    try {

        const { messages_id } = req.body

        await Message.updateMany({ _id: { $in: messages_id } }, { deleted: true })

        const message = await Message.findById(messages_id[0])

        const receiverSocketId = getReceiverSocketId(message.receiver)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('deleteMessageFromEveryone', messages_id)
        }

        return res.json({
            success: true,
            message: 'Messages Deleted',
            deleted_messages: messages_id
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}