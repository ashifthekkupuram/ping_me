import React from 'react'
import { Box, styled, } from '@mui/material'

import { useDispatch } from 'react-redux'

import ChatMenu from '../components/ChatMenu'
import ChatSection from '../components/ChatSection'

import { logout } from '../redux/slices/authSlice'

const ContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
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
      <Box component='nav' sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
        <ChatMenu />
      </Box>
      <ChatSection />
    </ContainerBox>
  )
}

export default Home
