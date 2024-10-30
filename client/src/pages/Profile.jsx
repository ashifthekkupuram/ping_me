import React from 'react'
import { Box, styled, Avatar, Typography, Button, capitalize } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

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

  const { name, username } = useSelector((state) => state.auth.UserData)

  const navigate = useNavigate()

  return (
    <MainBox>
      <ContainerBox>
        <Divider sx={{ alignSelf: 'center' }} > <Avatar sx={{ width: 68, height: 68, }} /> </Divider>
        <Divider> <Name variant='h1'>{capitalize(name?.firstName)} {capitalize(name?.secondName)}</Name> <CustomButton variant='contained' onClick={() => navigate('/name')} > <EditIcon /> </CustomButton> </Divider>
        <Divider> <Username variant='h6'>@{username}</Username> <CustomButton variant='contained' onClick={() => navigate('/username')} > <EditIcon /> </CustomButton> </Divider>
        <Divider sx={{ alignSelf: 'center' }} > <Button variant='contained' onClick={() => navigate('/change-password')} >Change Password</Button></Divider>
      </ContainerBox>
    </MainBox>
  )
}

export default Profile
