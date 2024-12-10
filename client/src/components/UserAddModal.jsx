import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, TextField, Button, Avatar, styled, capitalize, CircularProgress } from '@mui/material'
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

const FormBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    // gap: '8px',
    padding: '50px 25px',
    backgroundColor:  theme.palette.primary.contrastText,
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
    width: '400px'
}))

const Title = styled(Typography)(({theme}) => ({
    color: theme.palette.text.primary,
    marginBottom: '8px',
    alignSelf: 'center'
}))

const CustomButton = styled(Button)(({ theme }) => ({
    marginTop: '10px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled
  },
}))

const ResultBox = styled(Box)(({ theme }) => ({
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: '15px',
    paddingLeft: '20px',
    marginBottom: '10px'
}))

const UserAddModal = () => {

    const [username, setUsername] = useState()
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

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

    const onFind = async (e) => {
        e.preventDefault()
        setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }

    const onMessage = async () => {
        e.preventDefault()
        setLoading(true)
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
        } finally {
            setLoading(false)
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
            <FormBox sx={style} component='form' onSubmit={result ? onMessage : onFind}>
                <Title id="modal-modal-title" variant="h4">
                    Add User
                </Title>

                    {result ? <>
                        <ResultBox>
                            <Avatar sx={{ width: 50, height: 50 }} src={`${import.meta.env.VITE_BACKEND_URL}/images/profiles/${result.profile}`} />
                            <Typography variant='h6' >{capitalize(result.name.firstName)} {capitalize(result.name.secondName)}</Typography>
                        </ResultBox>
                        <TextField type='text' value={text} placeholder='send message...' onChange={(e) => setText(e.target.value)} />
                        <CustomButton type='submit' disabled={loading || !text} variant='contained'>{loading ? <CircularProgress size={22} /> : 'Send'}</CustomButton>
                    </> : <>
                        <TextField type='text' value={username} onChange={(e) => setUsername(e.target.value)} label='Username' placeholder='username...' />
                        <CustomButton type='submit' disabled={loading || !username} variant='contained'>{loading ? <CircularProgress size={22} /> : 'Find'}</CustomButton>
                        </>}
                
            </FormBox>
        </Modal>
    )
}

export default UserAddModal
