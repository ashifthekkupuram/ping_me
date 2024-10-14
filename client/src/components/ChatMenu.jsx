import React, { useEffect, useState } from 'react'
import { Drawer, styled, useMediaQuery, useTheme, Divider } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { get_users } from '../redux/slices/conversationsSlice'

import ChatCard from './ChatCard'

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  width: '50%',
  height: '90%',
  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 230 },
}))

const ChatMenu = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const chatMenu = useSelector((state) => state.chatMenu)
  const token = useSelector((state) => state.auth.token)
  const conversations = useSelector((state) => state.conversations)

  const getUser = async () => {
    setLoading(true)
    setError(null)
    const result = await dispatch(get_users({ token }))
    if (!result.payload.success) {
      console.log(result.payload.message)
      setError(result.payload.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <CustomDrawer variant={isMobile ? 'temporary' : 'permanent'} open={chatMenu} >
      <Divider sx={{ marginTop: 8 }} >Chats</Divider>
      { conversations.map((conv) => <ChatCard key={conv._id} name={conv.name.firstName} id={conv._id} />) }
    </CustomDrawer>
  )
}

export default ChatMenu


