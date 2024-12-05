import React, { useEffect, useRef, useState } from 'react'
import { Box, styled, FormGroup, TextField, Button, Avatar, Typography, Paper, CircularProgress, Alert, IconButton, Menu, MenuItem, capitalize } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import MenuIcon from '@mui/icons-material/Menu'
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
    display: 'flex',

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

const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    color: theme.palette.text.primary
}))

const SelectionBox = styled(Box)(({ theme }) => ({
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.error.main,
    padding: 10,
    borderRadius: 7
}))

const ChatSection = () => {

    const [text, setText] = useState('')
    const [textLoading, setTextLoading] = useState(false)
    const [menu, setMenu] = useState(false)
    const [selection, setSelection] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])

    const { user, conversation, error, loading } = useSelector((state) => state.conversation)
    const token = useSelector((state) => state.auth.token)
    const UserData = useSelector((state) => state.auth.UserData)
    const socket = useSelector((state) => state.online.socket)

    const dispatch = useDispatch()
    const MessageBodyRef = useRef(null)

    const onTextChange = (e) => {
        setText(e.target.value)
    }

    const menuClick = () => {
        setMenu(prev => !prev)
    }

    const menuClose = () => {
        setMenu(false)
    }

    const onSelection = () => {
        if(selection){
            setSelectedItems([])
            setSelection(false)
        }else{
            setSelection(true)
        }
    }

    const onSelect = (item) => {
        if(selectedItems.includes(item)){
            setSelectedItems( prev => prev.filter((i) => i !== item) )
        }else{
            setSelectedItems(prev => [...prev, item])
        }
    }

    const onSubmit = async () => {
        setTextLoading(true)
        try {
            const response = await axios.post(`/conversation/${user._id}`, { message: text.trim() }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(sendMessage(response.data.newMessage))
            setText('')
            scrollToBottom()
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message)
            } else {
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

    useEffect(() => {
        socket?.on('sendMessage', (newMessage) => {
            newMessage.shouldShake = true
            dispatch(sendMessage(newMessage))
        })

        return () => {
            socket?.off('sendMessage')
            setSelectedItems([])
            setMenu(false)
        }
    }, [socket, sendMessage, conversation])

    return (
        <ContainerBox>
            {error ? <LoadingBox> <Alert severity="error">{error}</Alert> </LoadingBox> : loading ? <LoadingBox> <CircularProgress /> </LoadingBox> : user ? <><CustomHeader>
                <HeaderContainer>
                    <Avatar src={`${import.meta.env.VITE_BACKEND_URL}/images/profiles/${user.profile}`} />
                    <HeaderTitle variant='h6'>{user && `${capitalize(user.name.firstName)} ${capitalize(user.name.secondName)}`}</HeaderTitle>
                </HeaderContainer>
                <HeaderContainer>
                    { selection && <SelectionBox>Selected { selectedItems.length }</SelectionBox>}
                    <IconButton onClick={menuClick}>
                        <CustomMenuIcon />
                    </IconButton>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={menu}
                        open={menu}
                        onClose={menuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        anchorOrigin={{
                            vertical: 120,
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={onSelection}>{ selection ? 'Unselect' : 'Select' }</MenuItem>
                        {selection && <MenuItem>Delete</MenuItem>}
                    </Menu>
                </HeaderContainer>
            </CustomHeader>
                <MessageBody elevation={0} ref={MessageBodyRef}>
                    {conversation.map((message) => UserData._id == message.sender ? (!message.delete_from.includes(UserData._id) && <MessageRight key={message._id} selectedItems={selectedItems} message={message} onClick={ () => onSelect(message._id)} onSelect={onSelect} selection={selection} />) : (!message.delete_from.includes(UserData._id) && <MessageLeft key={message._id} selectedItems={selectedItems} message={message} onSelect={onSelect} selection={selection} />))}
                </MessageBody>
                <Box row sx={{ display: 'flex', width: '100%' }}>
                    <TextField value={text} placeholder='Typing anything...' sx={{ flex: 3 }} onChange={onTextChange} />
                    <Button disabled={!text || textLoading} variant='contained' onClick={onSubmit}><SendIcon /></Button>
                </Box> </> : <LoadingBox> <Alert severity='error'>Please select an chat</Alert> </LoadingBox>}
        </ContainerBox>
    )
}

export default ChatSection
