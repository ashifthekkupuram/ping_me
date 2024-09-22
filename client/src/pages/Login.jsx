import React from 'react'

import { Box, styled, TextField, Typography, Button } from '@mui/material'

const Login = () => {

  const MainBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: theme.palette.background.default
  }))

  const FormBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '50px 25px',
    backgroundColor:  theme.palette.primary.contrastText,
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
    minWidth: '300px'
  }))

  const Title = styled(Typography)(({theme}) => ({
    color: theme.palette.text.primary,
    marginBottom: '8px'
  }))

  const LoginButton = styled(Button)(({ theme }) => ({
    marginTop: '10px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }))

  return (
    <MainBox>
      <FormBox>
       <Title variant='h4'>Login</Title>
       <TextField variant='outlined' label='Email' required fullWidth />
       <TextField type='password' variant='outlined' label='Password' required fullWidth />
       <LoginButton loading={true} loadingIndicator="Loading…" >Login</LoginButton>
      </FormBox> 
    </MainBox>
  )
}

export default Login
