import React, { useEffect, useState } from 'react'
import { Drawer, styled, useMediaQuery, useTheme, Divider, IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'

import { setAddUser } from '../redux/slices/addUserSlice'
import { get_users } from '../redux/slices/conversationsSlice'

import ChatCard from './ChatCard'

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  width: '50%',
  height: '90%',
  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 230 },
  '::-webkit-scrollbar': {
    width: 8
  },
  '::-webkit-scrollbar-track': {
    background: theme.palette.primary.contrastText
  },
  '::-webkit-scrollbar-thumb': {
    background: theme.palette.grey[400],
    "&:hover": {
      backgroundColor: theme.palette.grey[500],
    }
  },
  position: 'relative'
}))

const CustomIconButtom = styled(IconButton)(({ theme }) => ({
  height: 50,
  width: 50,
  position: 'absolute',
  bottom: 18,
  right: 18,
  backgroundColor: theme.palette.grey[600],
  color: theme.palette.primary.contrastText,
 
  "&:hover": {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.primary.contrastText,
  }
}))

const ChatMenu = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const chatMenu = useSelector((state) => state.chatMenu)
  const conversations = useSelector((state) => state.conversations)

  const getUser = async () => {
    setLoading(true)
    setError(null)
    const result = await dispatch(get_users())
    if (!result.payload.success) {
      console.log(result.payload.message)
      setError(result.payload.message)
    }
    setLoading(false)
  }

  const onAddChat = () => {
    dispatch(setAddUser({ open: true }))
    setMenu(false)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <CustomDrawer variant={isMobile ? 'temporary' : 'permanent'} open={chatMenu} >
      <Divider sx={{ marginTop: 8 }} >Chats</Divider>
      {conversations && conversations.map((conv) => <ChatCard key={conv._id} conv={conv} />)}
      <CustomIconButtom onClick={onAddChat}>
        <AddIcon />
      </CustomIconButtom>
    </CustomDrawer>
  )
}

export default ChatMenu


