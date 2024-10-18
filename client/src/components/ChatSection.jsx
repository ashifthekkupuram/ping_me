import React, { useEffect, useRef, useState } from 'react'
import { Box, styled, FormGroup, TextField, Button, Avatar, Typography, Paper, CircularProgress, Alert } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'

import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'

import axios from '../api/axios'
import { sendMessage } from '../redux/slices/conversationSlice'

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
    
    overflowY: 'auto',
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
    const [textLoading, setTextLoading] = useState(false)

    const { user, conversation, error, loading } = useSelector((state) => state.conversation )
    const token = useSelector((state) => state.auth.token )
    const UserData = useSelector((state) => state.auth.UserData )
    const socket = useSelector((state) => state.online.socket)

    const dispatch = useDispatch()
    const MessageBodyRef = useRef(null)

    const onTextChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = async () => {
        setTextLoading(true)
        try{
            const response = await axios.post(`/conversation/${user._id}`, { message: text.trim() }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(sendMessage(response.data.newMessage))
            setText('')
            scrollToBottom()
        } catch(err) {
            if(err.response){
                toast.error(err.response.data.message)
            }else{
                toast.error('Internal Server Error')
            }
        } finally {
            setTextLoading(false)
        }
    }

    const scrollToBottom = () => {
        if (MessageBodyRef.current) {
            MessageBodyRef.current.scrollTop = MessageBodyRef.current.scrollHeight
        }
      }

    useEffect(()=>{
        socket?.on('sendMessage', (newMessage) => {
            newMessage.shouldShake = true
            dispatch(sendMessage(newMessage))
        })
    },[socket, sendMessage, conversation])

  return (
    <ContainerBox>
        {error ? <LoadingBox> <Alert severity="error">{error}</Alert> </LoadingBox> : loading ? <LoadingBox> <CircularProgress /> </LoadingBox> : user ? <><CustomHeader>
            <HeaderContainer>
                <Avatar />
                <HeaderTitle variant='h6'>{ user && `${user.name.firstName} ${user.name.secondName}` }</HeaderTitle>
            </HeaderContainer>
            <HeaderContainer></HeaderContainer>
        </CustomHeader>
        <MessageBody elevation={0} ref={MessageBodyRef}>
            {conversation.map((message) => UserData._id == message.sender ? <MessageRight key={message._id} message={message} /> : <MessageLeft key={message._id} message={message} />)}
        </MessageBody>
        <Box row sx={{display: 'flex',width: '100%'}}>
            <TextField value={text} placeholder='Typing anything...' sx={{flex: 3}} onChange={onTextChange} />
            <Button disabled={!text || textLoading} variant='contained' onClick={onSubmit}><SendIcon /></Button>
        </Box> </> : <LoadingBox> <Alert severity='error'>Please select an chat</Alert> </LoadingBox> }
    </ContainerBox>
  )
}

export default ChatSection
