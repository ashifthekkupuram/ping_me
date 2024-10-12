import React from 'react'
import { ListItem, Avatar, ListItemButton, ListItemAvatar, ListItemText, Badge } from '@mui/material'

import { useSocketContext } from '../context/SocketContext'


const ChatCard = ({ name = 'Hello', id }) => {

    const { onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(id)

    console.log(isOnline)

    return (
        <ListItem>
            <ListItemButton>
                <ListItemAvatar>
                    {isOnline ? <Badge 
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                            <Avatar />
                    </Badge> : <Avatar />}
                </ListItemAvatar>
                <ListItemText primary={name} />
            </ListItemButton>
        </ListItem>
    )
}

export default ChatCard
