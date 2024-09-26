import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const AuthRequired = () => {

    const token = useSelector((state) => state.auth.token)

    useEffect(()=>{

    },[token])

  return (
    token ? <Outlet /> : <Navigate to='/login' />
  )
}

export default AuthRequired
