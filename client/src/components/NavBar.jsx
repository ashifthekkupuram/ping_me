import React from 'react'
import { AppBar, styled, Toolbar, Typography, Switch, Avatar } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useSelector, useDispatch } from 'react-redux';

import { toggleTheme } from '../redux/slices/darkModeSlice';

const CustomToolBar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText
}))

const CustomChatBubleIcon = styled(ChatBubbleIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const Title = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: theme.palette.text.primary,
  fontSize: '24px',
  fontWeight: '500',
  marginLeft: '5px',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const NavBar = () => {

  const darkMode = useSelector((state) => state.darkMode)
  const UserData = useSelector((state) => state.auth.UserData)
  const dispatch = useDispatch()

  const onToggle = () => {
    dispatch(toggleTheme())
  }

  return (
    <AppBar>
      <CustomToolBar>
        <CustomChatBubleIcon />
        <Title variant='h1'>Ping me</Title>
        <Switch checked={darkMode} onClick={onToggle} />
        <Avatar alt={`${UserData.name?.firstName} ${UserData.name?.secondName}`} src={UserData?.profile} />
      </CustomToolBar>
    </AppBar>
  )
}

export default NavBar
