import React,{ useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { styled, Box, CircularProgress } from '@mui/material'
import { io } from 'socket.io-client'
import { Toaster, toast } from 'react-hot-toast'

import { refresh } from '../redux/slices/authSlice'
import { setSocket, setOnline } from '../redux/slices/onlineSlice'
import UserAddModal from './UserAddModal'

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

    const refreshToken = async () => {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        await dispatch(refresh()).then((result)=>{
            if(result.payload.success){
               
            }else{
                if(result.payload.message === 'Forbidden'){
                    toast.error('Session Expired')
                }
            }
        })
        setLoading(false)
    }

    useEffect(()=>{
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
    (loading) ? <LoadingBox> <CircularProgress /> </LoadingBox> : <> <Toaster position="top-right" reverseOrder={false} /> <UserAddModal /> <Outlet /> </>
  )
}

export default AuthWrapper
