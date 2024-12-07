import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, styled, Button } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { deleteMessageFromMe, deleteMessageFromEveryone } from '../redux/slices/conversationSlice'

import axios from '../api/axios'

const StyledBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
    width: 300,
    bgcolor: "green",
    color: "white",
    px: 12,
    py: 8,
    borderRadius: 3,
    gap: 5
}))

const DeleteMessageModal = ({ deleteModal, setDeleteModal, selectedItems, onSelection }) => {

    const [deleteForEveryone, setDeleteForEveryone] = useState(false)
    const UserData = useSelector((state) => state.auth.UserData)
    const conversation = useSelector((state) => state.conversation.conversation)
    const socket = useSelector((state) => state.online.socket)

    const dispatch = useDispatch()

    const handleClose = () => {
        setDeleteModal(false)
    }

    const onDeleteForMe = async () => {
        try {
            const response = await axios.post('/message/delete_from', { messages_id: selectedItems })
            dispatch(deleteMessageFromMe(response.data.deleted_messages))
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message)
            } else {
                toast.error('Internal Server Error')
            }
        } finally {
            setDeleteModal(false)
            onSelection()
        }
    }

    const onDeleteForEveryone = async () => {
        try {
            const response = await axios.post('/message/delete', { messages_id: selectedItems })
            dispatch(deleteMessageFromEveryone(response.data.deleted_messages))
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message)
            } else {
                toast.error('Internal Server Error')
            }
        } finally {
            setDeleteModal(false)
            onSelection()
        }
    }

    useEffect(() => {
        const selectedConversations = conversation.filter((item) => 
            selectedItems.includes(item._id)
        )
        
        const isEverySenderMatch = selectedConversations.every(
            (item) => item.sender === UserData._id
        )
        setDeleteForEveryone(isEverySenderMatch)
    },[selectedItems])

    useEffect(() => {
        socket?.on('deleteMessageFromEveryone', (messages_id) => {
            dispatch(deleteMessageFromEveryone(messages_id))
        })

        return () => socket?.off('sendMessage')
        
    },[socket, deleteMessageFromEveryone])

    return (
        <Modal
            open={deleteModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledBox>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    You Sure you wanna delete {selectedItems.length} messages?
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    {deleteForEveryone && <Button onClick={onDeleteForEveryone}>Delete for everyone</Button>}
                    <Button onClick={onDeleteForMe}>Delete for me</Button>
                </Box>
            </StyledBox>
        </Modal>
    )
}

export default DeleteMessageModal
