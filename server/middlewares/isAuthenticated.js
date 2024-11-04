import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/user.model.js'

const isAuthenticated = async (req, res, next) => {
    try{

        if(
            req.headers.authorization === undefined || req.headers.authorization === null
        ){
            return res.status(400).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const token = req.headers.authorization.split(' ')[1]
    
        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token is not found'
            })
        }

        jwt.verify(token, process.env.ACCESS_SECRET_KEY, async (err, result) => {
            if(err){

                if(err.name === 'TokenExpiredError'){
                    return res.status(403).json({
                        success: false,
                        message: 'Token Expired'
                    })
                }

                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
                    error: err
                })
            }

            if(result){

                const user = await User.findById(result._Id)

                if(!user){
                    return res.status(400).json({
                        success: false,
                        message: 'Account not found'
                    })
                }

                if(!user.verified){
                    return res.status(400).json({
                        success: false,
                        message: 'Account is not verified'
                    })
                }

                req.token = token
                next()
            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Token expired or invalid'
                })
            }

        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export default isAuthenticated