import express from 'express'

import { get_verification, post_verification, delete_verification } from '../controllers/verification.controller.js'

const Router = express.Router()

Router.get('/:token', get_verification)
Router.post('/:token', post_verification)
Router.delete('/:token', delete_verification)

export default Router