import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, CircularProgress, styled } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import axios from '../api/axios'
import { updateUserData } from '../redux/slices/authSlice'

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

const NameChange = () => {

    const [name, setName] = useState({
        firstName: '',
        secondName: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { name: UserDataName } = useSelector((state) => state.auth.UserData)
    const token = useSelector((state) => state.auth.token)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChange = (e) => {
        setName(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const onSubmit = async (e) => {
        setError(null)
        setLoading(true)
        try {
            const response = await axios.put('/user/name', {
                name: {
                    firstName: name.firstName.trim(),
                    secondName: name.secondName.trim()
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch(updateUserData(response.data.updatedUser))
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

    const disabled = loading || !name.firstName || !name.secondName || (name.firstName === UserDataName.firstName && name.firstName === UserDataName.secondName)

    useEffect(() => {
        setName({ firstName: UserDataName.firstName, secondName: UserDataName.secondName })
    }, [])

    return (
        <MainBox>
            <FormBox component='form' onSubmit={onSubmit}>
                <Title variant='h4'>Name Change</Title>
                <TextField type='text' value={name.firstName} variant='outlined' name='firstName' id='firstName' label='First Name' onChange={onChange} error={error ? true : false} helperText={error} required fullWidth />
                <TextField type='text' value={name.secondName} variant='outlined' name='secondName' id='secondName' label='Second Name' onChange={onChange} error={error ? true : false} helperText={error} required fullWidth />
                <ChangeButton type='submit' disabled={disabled} >{loading ? <CircularProgress size={24} /> : 'Change'}</ChangeButton>
            </FormBox>
        </MainBox>
    )
}

export default NameChange
