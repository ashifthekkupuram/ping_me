import express from 'express'

import { get_users } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express()

Router.get('', isAuthenticated, get_users)

export default Router