import React, { useState } from 'react'

import { Box, styled, TextField, Typography, Button, CircularProgress } from '@mui/material'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useNavigate } from 'react-router-dom';

const MainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 0,
  width: '100%',
  minHeight: '100vh',
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
  width: '400px'
}))

const CustomChatBubleIcon = styled(ChatBubbleIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '40px',
  alignSelf: 'center'
}))

const Title = styled(Typography)(({theme}) => ({
  color: theme.palette.text.primary,
  marginBottom: '8px',
  alignSelf: 'center'
}))

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: '10px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&.Mui-disabled': {
  backgroundColor: theme.palette.action.disabledBackground,
  color: theme.palette.action.disabled
},
}))

const CustomLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&:hover':{
    cursor: 'pointer'
  }
}))

const Login = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const onChange = (e) => {
    setForm((prev) => ({...prev, [e.target.id]: e.target.value}))
  }

  return (
    <MainBox>
      <FormBox>
        <CustomChatBubleIcon />
        <Title variant='h4'>Login</Title>
        <TextField type='email' value={form.email} variant='outlined' name='email' id='email' label='Email' onChange={onChange} error={error} helperText={error} required fullWidth />
        <TextField type='password' value={form.password} variant='outlined' name='password' id='password' label='Password' onChange={onChange} error={error} helperText={error} required fullWidth />
        <LoginButton disabled={loading || !form.email || !form.password} >{ loading ? <CircularProgress size={24} /> : 'Login'}</LoginButton>
        <CustomLink variant='small' onClick={(e)=>navigate('/')}>Forgot password?</CustomLink>
        <CustomLink variant='small' onClick={(e)=>navigate('/register')}>Don't have an account?</CustomLink>
      </FormBox> 
    </MainBox>
  )
}

export default Login
