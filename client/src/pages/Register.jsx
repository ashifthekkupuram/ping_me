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
  width: '500px'
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

const RegisterButton = styled(Button)(({ theme }) => ({
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

const Register = () => {

  const [form, setForm] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
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
        <TextField type='text' value={form.firstName} variant='outlined' name='firstName' id='firstName' label='First Name' onChange={onChange} error={error} helperText={error} required fullWidth />
        <TextField type='text' value={form.secondName} variant='outlined' name='secondName' id='secondName' label='Second Name' onChange={onChange} error={error} helperText={error} required fullWidth />
        <TextField type='email' value={form.email} variant='outlined' name='email' id='email' label='Email' onChange={onChange} error={error} helperText={error} required fullWidth />
        <TextField type='password' value={form.password} variant='outlined' name='password' id='password' label='Password' onChange={onChange} error={error} helperText={error} required fullWidth />
        <RegisterButton disabled={loading || !form.email || !form.password || !form.firstName || !form.secondName} >{ loading ? <CircularProgress size={24} /> : 'Login'}</RegisterButton>
        <CustomLink variant='small' onClick={(e)=>navigate('/login')}>Already have an account?</CustomLink>
      </FormBox> 
    </MainBox>
  )
}

export default Register
