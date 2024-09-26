import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const AuthRedirect = () => {

    const token = useSelector((state) => state.auth.token)

    useEffect(()=>{

    },[token])

  return (
    token ? <Navigate to='/' /> : <Outlet />
  )
}

export default AuthRedirect
