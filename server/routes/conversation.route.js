import express from 'express'

import { get_coversation, post_coversation } from '../controllers/conversation.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express()

Router.get('/:userId', isAuthenticated, get_coversation)
Router.post('/:userId', isAuthenticated, post_coversation)

export default Router