import React from 'react'
import { ListItem, Avatar, ListItemButton, ListItemAvatar, ListItemText, Badge, styled, capitalize } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import { get_conversation } from '../redux/slices/conversationSlice'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  

const ChatCard = ({ conv }) => {

    const onlineUsers = useSelector((state) => state.online.users)
    const isOnline = onlineUsers.includes(conv._id)

    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()

    const onSubmit = async () => {
      console.log('Clicled')
      dispatch(get_conversation({ userId: conv._id, token, }))
    }

    return (
        <ListItem onClick={onSubmit}>
            <ListItemButton>
                <ListItemAvatar>
                    {isOnline ? <StyledBadge 
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                            <Avatar />
                    </StyledBadge> : <Avatar />}
                </ListItemAvatar>
                <ListItemText primary={`${capitalize(conv?.name?.firstName)} ${capitalize(conv?.name?.secondName)}`} />
            </ListItemButton>
        </ListItem>
    )
}

export default ChatCard
