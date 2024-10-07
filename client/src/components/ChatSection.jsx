import React, { useState } from 'react'
import { Box, styled, FormGroup, TextField, Button, TableHead, Avatar, Typography, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'

const ContainerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}))

const CustomHeader = styled(TableHead)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: `1px solid ${theme.palette.text.primary}`
}))

const HeaderContainer = styled(Box)(({ theme }) => ({
    display:'flex',
    alignItems: 'center',
    gap: 5,
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 500
}))

const MessageBody = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    padding: 10,
    height: 'calc(100vh - 140px)',
    
    overflowY: 'scroll',
}))

const ChatSection = () => {

    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    const onTextChange = (e) => {
        setText(e.target.value)
    }

    const addMessage = (e) => {
        setMessages(prev => [...prev, text])
        setText('')
    }

  return (
    <ContainerBox>
        <CustomHeader>
            <HeaderContainer>
                <Avatar />
                <HeaderTitle variant='h6'>Name</HeaderTitle>
            </HeaderContainer>
            <HeaderContainer></HeaderContainer>
        </CustomHeader>
        <MessageBody elevation={0}>
            {messages && messages.map((msg)=> <MessageRight message={msg} /> )}
        </MessageBody>
        <Box row sx={{display: 'flex',width: '100%'}}>
            <TextField value={text} placeholder='Typing anything...' autoComplete={false} sx={{flex: 3}} onChange={onTextChange} />
            <Button disabled={!text} variant='contained' onClick={addMessage}><SendIcon /></Button>
        </Box>
    </ContainerBox>
  )
}

export default ChatSection
