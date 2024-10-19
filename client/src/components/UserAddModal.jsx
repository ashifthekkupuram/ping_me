import React, { useState } from 'react'
import { Modal, Box, Typography, TextField, Button, Avatar } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { setAddUser } from '../redux/slices/addUserSlice'

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

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setAddUser({}))
        setUsername('')
        setText('')
    }

    const onFind = async () => {
        try{
            console.log('asdsad')
        } catch(err) {

        }
    }

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
                        result.username
                        <TextField type='text' value={text} placeholder='send message...' onChange={(e) => setText(e.target.value)} />
                        <Button variant='contained' >Send</Button>
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
