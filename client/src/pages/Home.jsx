import React from 'react'

import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'

import { logout } from '../redux/slices/authSlice'

const Home = () => {

  const dispatch = useDispatch()

  const onLogout = async (e) => {
    dispatch(logout())
  }

  return (
    <div>
      Home
      <Button onClick={onLogout}>Logout</Button>
    </div>
  )
}

export default Home
