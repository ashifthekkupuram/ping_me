import React from 'react'
import { Drawer, styled, useMediaQuery, useTheme, Divider } from '@mui/material'
import { useSelector } from 'react-redux'

import ChatCard from './ChatCard'

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  width: '50%',
  height: '90%',
  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 230 },
}))

const ChatMenu = () => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const chatMenu = useSelector((state) => state.chatMenu)

  return (
    <CustomDrawer variant={isMobile ? 'temporary': 'permanent'} open={chatMenu} >
      <Divider sx={{ marginTop: 8 }} >Chats</Divider>
        <ChatCard name='ashi' />
        <ChatCard name='ashi' />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
    </CustomDrawer>
  )
}

export default ChatMenu


