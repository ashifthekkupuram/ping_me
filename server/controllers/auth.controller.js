import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/user.model.js'
import Verification from '../models/verification.model.js'

import transporter from '../utils/mail.js'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/

export const login = async (req, res, next) => {
    try{

        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Email and Password required'
            })
        }

        const user = await User.findOne({ email: email.toLowerCase() })

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentials'
            })
        }

        if(!user.verified){

            await Verification.updateMany({ user }, { expired: true })

            const verification = new Verification({ user })
            const URL = process.env.ALLOWED_ORIGINS.split(' ')

            await Promise.all([
                await verification.save(),
                await transporter.sendMail({
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Account Verification',
                    text: 'To Verify or Delete account if it\'s not you',
                    html: `<a href='${URL[0]}/verification/${verification.token}'>Click here</a>`
                })
            ])


            return res.status(400).json({
                success: false,
                message: 'Account not verified(New verification link has been sended to gmail)'
            })
        }

        const match = bcrypt.compareSync(password, user.password)

        if(match){

            const accessToken = jwt.sign({
                _Id: user._id,
                email: user.email,
                username: user.username,
            },ACCESS_SECRET_KEY, { expiresIn: '5m' })

            const refreshToken = jwt.sign({
                _id: user._id
            }, REFRESH_SECRET_KEY, {expiresIn: '1d'})

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 1 * 24 * 60 * 60 * 1000
            })

            return res.json({
                success: true,
                message: 'Login successful',
                accessToken,
                userData: {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    bio: user.bio
                }
            })

        }else{
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentials'
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const register = async (req, res, next) => {
    try{

        const { email, firstName, secondName, password } = req.body

        if(!email, !firstName, !secondName, !password){
            return res.status(400).json({
                success: false,
                message: 'Email, first and second name, password required'
            })
        }

        if(!email.toLowerCase().match(EMAIL_REGEX)){
            return res.status(400).json({
                success: false,
                message: 'Invalid email'
            })
        }

        if(!password.match(PASSWORD_REGEX)){
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }

        if(firstName.length < 2 || secondName.length < 2){
            return res.status(400).json({
                success: false,
                message: 'First name and Second name must be 2 characters or above'
            })
        }

        const userExist = await User.findOne({ email: email.toLowerCase() })

        if(userExist){
            return res.status(400).json({
                success: false,
                message: 'User with email already exist'
            })
        }

        bcrypt.hash(password, 12, async (err, hashedPassword) => {
            if(!err){

                const user = new User({
                    email: email.toLowerCase(),
                    name: {
                        firstName: firstName.toLowerCase(),
                        secondName: secondName.toLowerCase(),
                    },
                    bio: '',
                    password: hashedPassword
                })

                const verification = new Verification({ user })

                const URL = process.env.ALLOWED_ORIGINS.split(' ')

                await Promise.all([
                    await verification.save(),
                    await user.save(),
                    await transporter.sendMail({
                        from: process.env.EMAIL,
                        to: user.email,
                        subject: 'Account Verification',
                        text: 'To Verify or Delete account if it\'s not you',
                        html: `<a href='${URL[0]}/verification/${verification.token}'>Click here</a>`
                    })
                ])

                return res.json({
                    success: false,
                    message: 'User has been created(Check your email to verify)'
                })

            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
                    error: err
                })
            }
        })

    } catch (err) {

        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const refresh = async (req, res, next) => {
    try{
       
        const cookies = req.cookies

        if(!cookies?.jwt){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const refreshToken = cookies.jwt


        jwt.verify(
            refreshToken,
            REFRESH_SECRET_KEY,
            async (err, decoded) => {

                if(err){
                    return res.status(403).json({
                        success: false,
                        message: 'Forbidden'
                    })
                }

                const user = await User.findById(decoded._id)

                if(!user){
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized'
                    })
                }

                const accessToken = jwt.sign({
                        _Id: user._id,
                        email: user.email,
                        username: user.username,
                    },
                    ACCESS_SECRET_KEY,
                    {expiresIn: '5m'}
                )

                return res.json({
                    success: true,
                    accessToken,
                    userData: {
                        _id: user._id,
                        email: user.email,
                        username: user.username,
                        name: user.name,
                        bio: user.bio
                    }
                })

            }
        )
        
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const logout = async (req, res, next) => {
    try{
        const cookies = req.cookies

        if(!cookies?.jwt) return res.sendStatus(204)
        
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })

        res.json({success: true, message: 'Logged out'})
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}