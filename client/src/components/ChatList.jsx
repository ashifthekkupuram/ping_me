import React from 'react'
import { List, ListItem, Avatar, ListItemButton, ListItemAvatar, ListItemText  } from '@mui/material'

const ChatList = () => {
  return (
    <List>
        <ListItem>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText primary={'Hello'} />
            </ListItemButton>
        </ListItem>
    </List>
  )
}

export default ChatList
