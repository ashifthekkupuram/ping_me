import jwt from 'jsonwebtoken'

import Message from '../models/message.model.js'

const isMessager = async (req, res, next) => {
    try{

        const { messages_id } = req.body

        const user_id = jwt.verify(req.token, process.env.ACCESS_SECRET_KEY)._Id

        const messages = await Message.find({ _id: { $in: messages_id } })

        const allMessageBelongToUser = messages.every(
            (message) => message.sender.toString() === user_id
        )

        if(!allMessageBelongToUser){
            return res.status(400).json({
                success: false,
                message: 'You are not authorized to access these messages'
            })
        }

        next()

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export default isMessager