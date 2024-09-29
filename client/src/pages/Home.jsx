import React from 'react'
import { Box, styled,  } from '@mui/material'

import { useDispatch } from 'react-redux'

import ChatMenu from '../components/ChatMenu'

import { logout } from '../redux/slices/authSlice'

const ContainerBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  height: 'calc(100vh - 64px)',
  [theme.breakpoints.down('lg')]: {
    height: 'calc(100vh - 56px)'
  }
}))

const Home = () => {

  const dispatch = useDispatch()

  const onLogout = async (e) => {
    dispatch(logout())
  }

  return (
    <ContainerBox>
      <ChatMenu />
    </ContainerBox>
  )
}

export default Home
