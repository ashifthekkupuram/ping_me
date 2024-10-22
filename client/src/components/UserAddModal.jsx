import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, TextField, Button, Avatar } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-hot-toast'

import { setAddUser } from '../redux/slices/addUserSlice'
import axios from '../api/axios'
import { newConv } from '../redux/slices/conversationsSlice'
import { get_conversation } from '../redux/slices/conversationSlice'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    color: 'text.primary',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const UserAddModal = () => {

    const [username, setUsername] = useState('')
    const [text, setText] = useState('')

    const { open, result } = useSelector((state) => state.addUser)
    const token = useSelector((state) => state.auth.token)
    const socket = useSelector((state) => state.online.socket)
    const conversations = useSelector((state) => state.conversations)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setAddUser({}))
        setUsername('')
        setText('')
    }

    const onFind = async () => {
        try{
            const response = await axios.get(`/user/${username}`, {headers: {
                Authorization: `Bearer ${token}`
            }})
            dispatch(setAddUser({ open: true, result: response.data.user }))
        } catch(err) {
            if(err.response){
                toast.error(err.response.data.message)
            }else{
                toast.error('Internal Server Error')
            }
        }
    }

    const onMessage = async () => {
        try{
            const response = await axios.post(`/conversation/${result._id}`, { message: text.trim() }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setText('')
            dispatch(newConv(result))
            dispatch(get_conversation({ token, userId: result._id }))
            dispatch(setAddUser({}))
        } catch(err) {

            console.log(err)

            if(err.response){
                toast.error(err.response.data.message)
            }else{
                toast.error('Internal Server Error')
            }
        }
    }

    useEffect(()=>{

        socket?.on('addChat', (Conv) => {
            newConv.shouldShake = true
            dispatch(newConv(Conv))
        })

        return () => socket?.off('addChat')

    },[socket, newConv, conversations])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Add user
                </Typography>
                <Box>
                    {result ? <>
                        {result.username}
                        <TextField type='text' value={text} placeholder='send message...' onChange={(e) => setText(e.target.value)} />
                        <Button variant='contained' onClick={onMessage} >Send</Button>
                    </> : <>
                        <TextField sx={{ height: '30px' }} type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username...' />
                        <Button variant='contained' onClick={onFind} >Find</Button>
                        </>}
                </Box>
            </Box>
        </Modal>
    )
}

export default UserAddModal
