import React from 'react'
import { Drawer, styled, useMediaQuery, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'

import ChatCard from './ChatCard'

const ChatMenu = () => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const chatMenu = useSelector((state) => state.chatMenu)

  return (
    <>
    <Drawer variant={isMobile ? 'temporary': 'permanent'} open={chatMenu}>
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
    </Drawer>
    </>
  )
}

export default ChatMenu


