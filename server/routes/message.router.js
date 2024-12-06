import express from 'express'

import { delete_message, delete_message_from_me } from '../controllers/message.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isMessager from '../middlewares/isMessager.js'
import isConversation from '../middlewares/isConversation.js'

const Router =  express.Router()

Router.post('/delete', isAuthenticated, isMessager, delete_message)
Router.post('/delete_from', isAuthenticated, isConversation, delete_message_from_me)

export default Router