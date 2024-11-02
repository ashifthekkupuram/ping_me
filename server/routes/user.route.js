import express from 'express'

import { get_users, find_user, update_name, update_username, change_password, add_profile, remove_profile } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../utils/profileUploader.js'

const Router = express()

Router.get('', isAuthenticated, get_users)
Router.get('/:username', isAuthenticated, find_user)
Router.put('/name', isAuthenticated, update_name)
Router.put('/username', isAuthenticated, update_username)
Router.put('/change-password', isAuthenticated, change_password)

Router.post('/profile', isAuthenticated, upload, add_profile)
Router.delete('/profile', isAuthenticated, remove_profile)

export default Router