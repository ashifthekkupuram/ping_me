import React,{ useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { styled, Box, CircularProgress } from '@mui/material'

import { refresh } from '../redux/slices/authSlice'

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
    
  return (
    loading ? <LoadingBox> <CircularProgress /> </LoadingBox> : <Outlet />
  )
}

export default AuthWrapper
