import express from 'express'

import { login, register, refresh, logout } from '../controllers/auth.controller.js'

const Router = express.Router()

Router.post('/login', login)
Router.post('/register', register)
Router.post('/refresh', refresh)
Router.post('/logout', logout)

export default Router