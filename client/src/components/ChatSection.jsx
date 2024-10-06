import React from 'react'
import { Box, styled, FormGroup, TextField, Button, TableHead, Avatar, Typography, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'

const ContainerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}))

const CustomHeader = styled(TableHead)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
}))

const HeaderContainer = styled(Box)(({ theme }) => ({
    display:'flex',
    alignItems: 'center',
    gap: 5,
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: 16,
    fontWeight: 500
}))

const MessageBody = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    padding: 10,
    height: 'calc(100vh - 140px)',
    
    overflowY: 'scroll',
}))

const ChatSection = () => {
  return (
    <ContainerBox>
        <CustomHeader>
            <HeaderContainer>
                <Avatar />
                <HeaderTitle variant='h6'>Name</HeaderTitle>
            </HeaderContainer>
            <HeaderContainer></HeaderContainer>
        </CustomHeader>
        <MessageBody elevation={0}>
            <MessageLeft message={'Hi'} />
            <MessageLeft message={'Hello'} />
            <MessageLeft message={'asdasdasdasdasdasdasdasdasdasdasdasdasdaasdasdasdasdasdasdasdasdasd'} />
            <MessageRight message={'Yo'} />
            <MessageRight message={'How you been'} />
            <MessageRight message={'How you been asdasdasdasdasdasdadadadadasdasdasdasd'} />
        </MessageBody>
        <FormGroup row sx={{display: 'flex',width: '100%'}}>
            <TextField placeholder='Typing anything...' />
            <Button variant='contained'><SendIcon /></Button>
        </FormGroup>
    </ContainerBox>
  )
}

export default ChatSection
