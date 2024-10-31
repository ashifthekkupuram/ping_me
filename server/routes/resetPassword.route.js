import express from 'express'

import { get_reset_password, post_reset_password } from '../controllers/resetPassword.controller.js'

const Router = express.Router()

Router.post('/', post_reset_password)

Router.get('/:token', get_reset_password)

export default Router