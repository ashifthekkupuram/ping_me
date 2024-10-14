import express from 'express'
import { Server } from "socket.io";
import http from 'http'
import dotenv from 'dotenv'

dotenv.config()

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || 'http://localhost:5173'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ALLOWED_ORIGINS.split(' '),
        methods: ['GET', 'POST']
    }
})

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on('connection', (socket) => {

    console.log(ALLOWED_ORIGINS.split(' '))

    console.log("a user connected ", socket.id)

    const userId = socket.handshake.query.userId
	if (userId && userId != 'undefined') userSocketMap[userId] = socket.id

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
		console.log('user disconnected', socket.id)
		delete userSocketMap[userId]
		io.emit('getOnlineUsers', Object.keys(userSocketMap))
	})

})

export { app, io, server }