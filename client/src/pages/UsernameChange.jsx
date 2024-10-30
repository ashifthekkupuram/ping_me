import React from 'react'
import { Box, Typography, styled } from '@mui/material'

const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    width: '100%',
    height: 'calc(100vh - 64px)',
    [theme.breakpoints.down('lg')]: {
        height: 'calc(100vh - 56px)'
    },
    backgroundColor: theme.palette.background.default
}))

const FormBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '50px 25px',
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
    width: '400px'
}))

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginBottom: '8px',
    alignSelf: 'center'
}))

const UsernameChange = () => {
    return (
        <MainBox>
            <FormBox>
                <Title variant='h4'>Username Change</Title>
            </FormBox>
        </MainBox>
    )
}

export default UsernameChange
