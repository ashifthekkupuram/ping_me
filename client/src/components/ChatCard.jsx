import React from 'react'
import { ListItem, Avatar, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material'

const ChatCard = ({ name = 'Hello' }) => {
    return (
        <ListItem>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText primary={name} />
            </ListItemButton>
        </ListItem>
    )
}

export default ChatCard
