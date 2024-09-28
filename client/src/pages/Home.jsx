import React from 'react'
import { Box, styled } from '@mui/material'

import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'

import ChatList from '../components/ChatList'

import { logout } from '../redux/slices/authSlice'

const ContainerBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  minHeight: '89vh'
}))

const Home = () => {

  const dispatch = useDispatch()

  const onLogout = async (e) => {
    dispatch(logout())
  }

  return (
    <ContainerBox>
      <ChatList />
    </ContainerBox>
  )
}

export default Home
