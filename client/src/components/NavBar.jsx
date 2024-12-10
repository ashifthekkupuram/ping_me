import React, { useState } from 'react'
import { AppBar, styled, Toolbar, Typography, Switch, Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { toggleTheme } from '../redux/slices/darkModeSlice'
import { toggleMenu } from '../redux/slices/chatMenu'
import { logout } from '../redux/slices/authSlice'
import { setAddUser } from '../redux/slices/addUserSlice'

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}))

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

const CustomMenu = styled(Menu)(({ theme }) => ({
 
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
}))

const NavBar = () => {

  const [menu, setMenu] = useState(false)

  const chatMenu = useSelector((state) => state.chatMenu)
  const darkMode = useSelector((state) => state.darkMode)
  const UserData = useSelector((state) => state.auth.UserData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = async () => {
      const result = await dispatch(logout())
      toast.success(result.payload.message)
  }

  const onToggle = () => {
    dispatch(toggleTheme())
  }

  const onMenu = () => {
    dispatch(toggleMenu())
  }

  const onSetMenu = ()=> {
    setMenu(prev => !prev)
  }

  const onCloseMenu = () => {
    setMenu(false)
  }

  const onAddChat = () => {
    dispatch(setAddUser({ open: true }))
    setMenu(false)
  }

  const onProfile = () => {
    navigate('/profile')
    setMenu(false)
  }

  const onHome = () => {
    navigate('/')
    setMenu(false)
  }

  return (
    <CustomAppBar position='sticky'>
      <CustomToolBar>
        <Section>
          <CustomIconButton onClick={onMenu} size='small' edge='start'>
            {chatMenu ? <MenuOpenIcon /> : <MenuIcon />}
          </CustomIconButton>
          <CustomChatBubleIcon />
          <Title variant='h1'>Ping me</Title>
        </Section>
        <Section>
          <Switch checked={darkMode} onClick={onToggle} />
          <Tooltip name='Account settings'>
          <IconButton 
            aria-controls={menu ? 'account-menu' : undefined}
            aria-expanded={menu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={onSetMenu} >
          <Avatar src={UserData.profile && `${import.meta.env.VITE_BACKEND_URL}/images/profiles/${UserData.profile}`} alt={`${UserData.name?.firstName} ${UserData.name?.secondName}`} />
          </IconButton>
          </Tooltip>
          <CustomMenu open={menu} id='account-menu' onClose={onCloseMenu} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
            <MenuItem onClick={onHome}>Home</MenuItem>
            <MenuItem onClick={onProfile}>Profile</MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </CustomMenu>
        </Section>
      </CustomToolBar>
    </CustomAppBar>
  )
}

export default NavBar
