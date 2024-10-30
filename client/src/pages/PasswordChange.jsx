import React, { useState } from 'react'
import { Box, Typography, Button, TextField, CircularProgress, styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import axios from '../api/axios'

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

const ChangeButton = styled(Button)(({ theme }) => ({
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

const PasswordChange = () => {

    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const token = useSelector((state) => state.auth.token)

    const navigate = useNavigate()

    const onChange = (e) => {
        setPassword(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const onSubmit = async (e) => {
        setError(null)
        setLoading(true)
        try {
            const response = await axios.put('/user/change-password', { oldPassword: password.oldPassword, newPassword: password.confirmNewPassword }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/profile')
            toast.success(response.data.message)
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

    const disabled = !password.oldPassword || !password.newPassword || !password.confirmNewPassword || !(password.newPassword === password.confirmNewPassword)

    return (
        <MainBox>
            <FormBox>
                <Title variant='h4'>Password Change</Title>
                <TextField type='password' value={password.oldPassword} variant='outlined' name='oldPassword' id='oldPassword' label='Old Password' onChange={onChange} error={error ? true : false} helperText={error} required fullWidth />
                <TextField type='password' value={password.newPassword} variant='outlined' name='newPassword' id='newPassword' label='New Password' onChange={onChange} error={error ? true : false} helperText={error} required fullWidth />
                <TextField type='password' value={password.confirmNewPassword} variant='outlined' name='confirmNewPassword' id='confirmNewPassword' label='Confirm New Password' onChange={onChange} error={error ? true : false} helperText={error} required fullWidth />
                <ChangeButton disabled={disabled} onClick={onSubmit} >{loading ? <CircularProgress size={24} /> : 'Change'}</ChangeButton>
            </FormBox>
        </MainBox>
    )
}

export default PasswordChange
