import express from 'express'

import { get_users, find_user, update_name, update_username } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express()

Router.get('', isAuthenticated, get_users)
Router.get('/:username', isAuthenticated, find_user)
Router.put('/name', isAuthenticated, update_name)
Router.put('/username', isAuthenticated, update_username)

export default Router