import React, { useState } from 'react'
import { AppBar, styled, Toolbar, Typography, Switch, Avatar, Box, IconButton } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useSelector, useDispatch } from 'react-redux';

import { toggleTheme } from '../redux/slices/darkModeSlice';

const CustomToolBar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  marginRight: 2,
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  }
}))

const CustomChatBubleIcon = styled(ChatBubbleIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const Title = styled(Typography)(({ theme }) => ({
  display: 'block',
  color: theme.palette.text.primary,
  fontSize: '24px',
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const Section = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
}))

const NavBar = () => {

  const [showMenu, showMenuIcon] = useState(false)

  const darkMode = useSelector((state) => state.darkMode)
  const UserData = useSelector((state) => state.auth.UserData)
  const dispatch = useDispatch()

  const onToggle = () => {
    dispatch(toggleTheme())
  }

  const onMenu = () => {
    showMenuIcon((prev) => !prev)
  }

  return (
    <AppBar position='sticky'>
      <CustomToolBar>
        <Section>
          <CustomIconButton onClick={onMenu} size='small' edge='start'>
            {showMenu ? <MenuOpenIcon /> : <MenuIcon />}
          </CustomIconButton>
          <CustomChatBubleIcon />
          <Title variant='h1'>Ping me</Title>
        </Section>
        <Section>
          <Switch checked={darkMode} onClick={onToggle} />
          <Avatar alt={`${UserData.name?.firstName} ${UserData.name?.secondName}`} src={UserData?.profile} />
        </Section>
      </CustomToolBar>
    </AppBar>
  )
}

export default NavBar
