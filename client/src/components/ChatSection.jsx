import React, { useState } from 'react'
import { Box, styled, FormGroup, TextField, Button, Avatar, Typography, Paper, CircularProgress, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useSelector } from 'react-redux'

import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'

const ContainerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}))

const CustomHeader = styled(Box)(({ theme }) => ({
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

const LoadingBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default
}))

const ChatSection = () => {

    const [text, setText] = useState('')

    const { id, conversation, error, loading } = useSelector((state) => state.conversation )

    const onTextChange = (e) => {
        setText(e.target.value)
    }

    const addMessage = async (e) => {
        
    }

  return (
    <ContainerBox>
        {error ? <LoadingBox> <Alert severity="error">{error}</Alert> </LoadingBox> : loading ? <LoadingBox> <CircularProgress /> </LoadingBox> : !id ? <LoadingBox> <Alert severity='error'>Please select an chat</Alert> </LoadingBox> : <><CustomHeader>
            <HeaderContainer>
                <Avatar />
                <HeaderTitle variant='h6'>{ id && id }</HeaderTitle>
            </HeaderContainer>
            <HeaderContainer></HeaderContainer>
        </CustomHeader>
        <MessageBody elevation={0}>
            {conversation && conversation.map((msg, index)=> <MessageRight key={index} message={msg} /> )}
        </MessageBody>
        <Box row sx={{display: 'flex',width: '100%'}}>
            <TextField value={text} placeholder='Typing anything...' sx={{flex: 3}} onChange={onTextChange} />
            <Button disabled={!text} variant='contained' onClick={addMessage}><SendIcon /></Button>
        </Box> </>}
    </ContainerBox>
  )
}

export default ChatSection
