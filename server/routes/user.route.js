import express from 'express'

import { get_users, find_user } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express()

Router.get('', isAuthenticated, get_users)
Router.get('/:username', isAuthenticated, find_user)

export default Router