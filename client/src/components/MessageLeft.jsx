import React from 'react'
import { Box, styled, Typography } from '@mui/material'

const MessageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  padding: 8,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 6,
  width: 'fit-content',
  minWidth: '1rem',
  wordBreak: 'break-word',
  borderTopLeftRadius: 0
}))

const Message = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}))

const MessageLeft = ({ message, selectedItems, onSelect, selection }) => {

  return (
    <MessageBox sx={{ backgroundColor: selectedItems.includes(message._id) && 'blue' }} onClick={() => selection && onSelect(message._id)}>
      <Message >{ message.deleted ? '(Message is deleted)' : message.message}</Message>
    </MessageBox>
  )
}

export default MessageLeft
