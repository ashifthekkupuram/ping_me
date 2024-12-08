import React, { useRef, useState } from 'react'
import { Box, styled, Avatar, Typography, Button, IconButton, CircularProgress, capitalize } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-hot-toast'

import axios from '../api/axios'
import { updateUserData } from '../redux/slices/authSlice'
import { refresh } from '../redux/slices/authSlice'

const MainBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.contrastText,
  height: 'calc(100vh - 64px)',
  [theme.breakpoints.down('lg')]: {
    height: 'calc(100vh - 56px)'
  }
}))

const ContainerBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '50px 25px',
  backgroundColor: theme.palette.primary.contrastText,
  borderRadius: '10px',
  boxShadow: theme.shadows[3],
  width: '300px',
  color: theme.palette.text.primary
}))

const Divider = styled(Box)(({ them }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
  gap: 10
}))

const Name = styled(Typography)(({ }) => ({
  fontSize: 28,
}))

const Username = styled(Typography)(({ }) => ({
  fontSize: 20,
}))

const CustomButton = styled(Button)(({ }) => ({
  height: 30,
  width: 10,
  padding: 2
}))

const Profile = () => {

  const [loading, setLoading] = useState(false)

  const UserData = useSelector((state) => state.auth.UserData)
  const token = useSelector((state) => state.auth.token)

  const ImageField = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onChange = async (e) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('profile', e.target.files[0])

      const response = await axios.post('/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(updateUserData(response.data.updatedUser))
      toast.success(response.data.message)
    } catch (err) {
      if (err.response) {
        if (err.status === 403) {
          await dispatch(refresh()).then((result) => {
            if (result.payload.success) {
              toast.error('Try again')
            } else {
              if (result.payload.message === 'Forbidden') {
                toast.error('Session Expired')
              }
            }
          })

        } else {
          toast.error(err.response.data.message)
        }
      } else {
        toast.error('Internal Server Error')
      }
    } finally {
      setLoading(false)
      if (ImageField.current) {
        ImageField.current.value = null
      }
    }
  }

  const onRemove = async () => {
    try {
      const response = await axios.delete('/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(updateUserData(response.data.updatedUser))
      toast.success(response.data.message)
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message)
      } else {
        toast.error('Internal Server Error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainBox>
      <ContainerBox>
        <Divider sx={{ alignSelf: 'center' }} >
          <IconButton onClick={() => ImageField.current.click()}>
            {loading ? <CircularProgress size={25} /> : <Avatar src={UserData.profile && `${import.meta.env.VITE_BACKEND_URL}/images/profiles/${UserData.profile}`} sx={{ width: 68, height: 68, }} />}
          </IconButton>
          <input ref={ImageField} value={null} style={{ display: 'none' }} type="file" onChange={onChange} />
        </Divider>
        {UserData.profile && <Divider sx={{ alignSelf: 'center' }} > <Button variant='contained' color='error' onClick={onRemove} >Remove Profile</Button></Divider>}
        <Divider> <Name variant='h1'>{capitalize(UserData.name?.firstName)} {capitalize(UserData.name?.secondName)}</Name> <CustomButton variant='contained' onClick={() => navigate('/name')} > <EditIcon /> </CustomButton> </Divider>
        <Divider> <Username variant='h6'>@{UserData.username}</Username> <CustomButton variant='contained' onClick={() => navigate('/username')} > <EditIcon /> </CustomButton> </Divider>
        <Divider sx={{ alignSelf: 'center' }} > <Button variant='contained' onClick={() => navigate('/change-password')} >Change Password</Button></Divider>
      </ContainerBox>
    </MainBox>
  )
}

export default Profile
