import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { styled, Box, CircularProgress } from '@mui/material'
import { io } from 'socket.io-client'

import { refresh } from '../redux/slices/authSlice'
import { setSocket, setOnline } from '../redux/slices/onlineSlice'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const LoadingBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default
}))

const AuthWrapper = () => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const UserData = useSelector((state) => state.auth.UserData)

    useEffect(()=>{
        const refreshToken = async () => {
            setLoading(true)
            await new Promise(resolve => setTimeout(resolve, 1000))
            await dispatch(refresh()).then((result)=>{
                if(result.payload.success){
                    // Do nothing for now
                }else{
                    // Do nothing for now
                }
            })
            setLoading(false)
        }
        refreshToken()
    },[])

    useEffect(() => {
        if(UserData){
            const socket = io(BACKEND_URL, {
                query: {
                    userId: UserData?._id
                }
            })

            dispatch(setSocket(socket))

            socket.on("getOnlineUsers", (users) => {
				dispatch(setOnline(users))
			})

            return () => socket?.close()

        } else {

            socket?.close()
            dispatch(setSocket(null))

        }
    },[UserData])
    
  return (
    loading ? <LoadingBox> <CircularProgress /> </LoadingBox> : <Outlet />
  )
}

export default AuthWrapper
