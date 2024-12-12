import React, { useState } from 'react'
import { Box, Typography, Button, TextField, CircularProgress, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { toast } from 'react-hot-toast'

import axios from '../api/axios'

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
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
    width: '400px'
}))

const CustomChatBubleIcon = styled(ChatBubbleIcon)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '40px',
    alignSelf: 'center'
}))

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginBottom: '8px',
    alignSelf: 'center'
}))

const ResetButton = styled(Button)(({ theme }) => ({
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
    '&:hover': {
        cursor: 'pointer'
    }
}))

const ResetPassword = () => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] =  useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const onChange = (e) => {
        setEmail(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try{
            const response = await axios.post('/reset/', { email: email.trim() })
            navigate('/login')
            toast.success(response.data.message)
        } catch(err) {
            if(err.response){
                setError(err.response.data.message)
            }else{
                setError('Internal Server Error')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <MainBox>
            <FormBox component='form' onSubmit={onSubmit}>
                <CustomChatBubleIcon />
                <Title variant='h4'>Reset Password</Title>
                <TextField type='email' value={email} variant='outlined' name='email' id='email' label='Email' onChange={onChange} error={error ? true : false} helperText={error} required fullWidth />
                <ResetButton type='submit' disabled={loading || !email} >{loading ? <CircularProgress size={24} /> : 'Reset'}</ResetButton>
                <CustomLink variant='small' onClick={(e) => navigate('/login')}>Go to Login?</CustomLink>
            </FormBox>
        </MainBox>
    )
}

export default ResetPassword
