import React from 'react'
import { Box, styled, Typography } from '@mui/material'

const MessageBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    backgroundColor: theme.palette.primary.main,
    alignSelf: 'end',
    borderRadius: 6,
    width: 'fit-content',
    minWidth: '1rem',
    wordBreak: 'break-word',
    borderTopRightRadius: 0
}))

const Message = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    textAlign: 'right',
}))

const MessageRight = ({ message, selectedItems, onSelect, selection }) => {
  return (
    <MessageBox sx={{ backgroundColor: selectedItems.includes(message._id) && 'blue' }} onClick={() => selection && onSelect(message._id)}>
      <Message>{message.message}</Message>
    </MessageBox>
  )
}

export default MessageRight
