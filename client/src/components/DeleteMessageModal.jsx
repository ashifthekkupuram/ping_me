import React from 'react'
import { Modal, Box, Typography, styled, Button } from '@mui/material'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { deleteMessageFromMe } from '../redux/slices/conversationSlice'

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

    const dispatch = useDispatch()

    const handleClose = () => {
        setDeleteModal(false)
    }

    const onDeleteForMe = async () => {
        try{
            const response = await axios.post('/message/delete_from', { messages_id: selectedItems })
            dispatch(deleteMessageFromMe(response.data.deleted_messages))
        } catch(err) {
            if(err.response){
                toast.error(err.response.data.message)
            }else{
                toast.error('Internal Server Error')
            }
        } finally {
            setDeleteModal(false)
            onSelection()
        }
}

    return (
        <Modal
            open={deleteModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <StyledBox>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    You Sure you wanna delete { selectedItems.length } messages?
                </Typography>
                <Box sx={{ display: 'flex' }}>
                    <Button>Delete for everyone</Button>
                    <Button onClick={onDeleteForMe}>Delete for me</Button>
                </Box>
            </StyledBox>
        </Modal>
    )
}

export default DeleteMessageModal
