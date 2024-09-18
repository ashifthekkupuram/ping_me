import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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

        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, result) => {
            if(err){
                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
                    error: err
                })
            }

            if(result){
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

        })
    }
}

export default isAuthenticated