import React, { useEffect, useState } from 'react'
import { Box, styled, Button, CircularProgress, Typography } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import DangerousIcon from '@mui/icons-material/Dangerous'
import BeenhereIcon from '@mui/icons-material/Beenhere'
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

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    marginBottom: '8px',
    alignSelf: 'center'
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

const CustomButton = styled(Button)(({ theme }) => ({
    marginTop: '10px',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
    '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled
    },
}))

const Verification = () => {

    const [verifyLoading, setVerifyLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [resultLoading, setResultLoading] = useState(false)
    const [result, setResult] = useState(null)

    const navigate = useNavigate()
    const { token } = useParams()

    const onVerify = async (e) => {
        e.preventDefault()
        setResult(null)
        setVerifyLoading(true)
        try{
            const response = await axios.post(`/verification/${token}`)
            navigate('/login')
            toast.success(response.data.message)
        }catch(err){
            if(err.response){
                setResult({success: false,message: err.response.data.message})
            }else{
                setResult({success: false,message: "Internal Server Error"})
            }
        } finally {
            setVerifyLoading(false)
        }
    }

    const onDelete = async () => {
        e.preventDefault()
        setResult(null)
        setDeleteLoading(true)
        try{
            const response = await axios.delete(`/verification/${token}`)
            navigate('/register')
            toast.success(response.data.message)
        }catch(err){
            if(err.response){
                setResult({success: false,message: err.response.data.message})
            }else{
                setResult({success: false,message: "Internal Server Error"})
            }
        } finally {
            setDeleteLoading(false)
        }
    }

    const onValidToken = async () => {
        setResult(null)
        setResultLoading(true)
        try{
            await axios.get(`/verification/${token}`)
        }catch(err){
            if(err.response){
                setResult({success: false,message: err.response.data.message})
            }else{
                setResult({success: false,message: "Internal Server Error"})
            }
        } finally {
            setResultLoading(false)
        }
    }

    const disabled = verifyLoading || deleteLoading

    useEffect(() => {
        onValidToken()
    },[token])

    return (
        <MainBox>
            <FormBox>
                {resultLoading ? <CircularProgress size={40} /> : (result ?
                    <>
                        { result & result.success ? <CustomBeenhereIcon /> : <CustomDangerousIcon/> }
                        <Title variant='h4'>{ result && result.message }</Title>
                    </> :
                    <>
                        <CustomChatBubleIcon />
                        <Title variant='h4'>Account Verification</Title>
                        <CustomButton disabled={disabled} variant='contained' color='success' onClick={onVerify}>{verifyLoading ? <CircularProgress size={32}/> : 'Verify'}</CustomButton>
                        <CustomButton disabled={disabled} variant='contained' color='error' onClick={onDelete}>{deleteLoading ? <CircularProgress size={32} /> : 'Delete'}</CustomButton>
                    </>)}
            </FormBox>
        </MainBox>
    )
}

export default Verification
