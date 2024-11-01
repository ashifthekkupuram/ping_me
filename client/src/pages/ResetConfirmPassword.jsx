import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, TextField, CircularProgress, styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import DangerousIcon from '@mui/icons-material/Dangerous'
import BeenhereIcon from '@mui/icons-material/Beenhere'

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
    alignSelf: 'center',
}))

const CustomDangerousIcon = styled(DangerousIcon)(({ theme }) => ({
    fontSize: '80px',
    alignSelf: 'center',
    color: theme.palette.error.main
}))

const CustomBeenhereIcon = styled(BeenhereIcon)(({ theme }) => ({
    fontSize: '80px',
    alignSelf: 'center',
    color: theme.palette.success.main
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

const ResetConfirmPassword = () => {

    const [password, setPassword] = useState({
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [resultLoading, setResultLoading] = useState(false)
    const [result, setResult] = useState(null)

    const navigate = useNavigate()
    const { token } = useParams()

    const onChange = (e) => {
        setPassword(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const onSubmit = async (e) => {
        try {
            const response = await axios.put(`/reset/${token}`, { newPassword: password.password })
            setResult({ success: true, message: response.data.message })
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message)
            } else {
                setError('Internal Server Error')
            }
        } finally {
            setLoading(false)
        }
    }

    const expiredCheck = async () => {
        setResult(null)
        setResultLoading(true)
        try {
            await axios.get(`/reset/${token}`)
            setResult(null)
        } catch (err) {
            if (err.response) {
                setResult({ success: false, message: err.response.data.message })
            } else {
                setResult({ success: false, message: 'Internal Server Error' })
            }
        } finally {
            setResultLoading(false)
        }
    }

    useEffect(() => {
        expiredCheck()
    }, [token])



    return (
        <MainBox>
            <FormBox>
                {resultLoading ? <CircularProgress size={40} /> : (result ?
                    <>
                        { result && result.success ? <CustomBeenhereIcon/> : <CustomDangerousIcon /> }
                        <Title variant='h4'>{ result && result.message }</Title>
                    </>
                    :
                    <>
                        <CustomChatBubleIcon />
                        <Title variant='h4'>Confirm Reset Password</Title>
                        <TextField type='password' value={password.password} variant='outlined' name='password' id='password' label='Password' onChange={onChange} error={error ? true : false} helperText={error} required fullWidth />
                        <TextField type='password' value={password.confirmPassword} variant='outlined' name='confirmPassword' id='confirmPassword' label='Confirm Password' onChange={onChange} error={error ? true : false} helperText={error} required fullWidth />
                        <ResetButton disabled={loading || !password.password || !password.confirmPassword || !(password.password === password.confirmPassword)} onClick={onSubmit} >{loading ? <CircularProgress size={24} /> : 'Reset Password'}</ResetButton>
                        <CustomLink variant='small' onClick={(e) => navigate('/login')}>Go to Login?</CustomLink>
                    </>
                )}
            </FormBox>
        </MainBox >
    )
}

export default ResetConfirmPassword
