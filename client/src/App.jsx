import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import { useSelector } from 'react-redux'

import { Home, Login, Register, Landing, Profile } from './pages'
import NavWrapper from './components/NavWrapper'
import AuthRedirect from './components/AuthRedirect'
import AuthRequired from './components/AuthRequired'
import AuthWrapper from './components/AuthWrapper'

const App = () => {

  const darkMode = useSelector((state) => state.darkMode)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthWrapper />,
      children: [
        {
          path: '/',
          element: <NavWrapper />,
          children: [
            {
              path: '/',
              element: <AuthRequired />,
              children: [
                {
                  path: '/',
                  element: <Home />
                },
                {
                  path: '/profile',
                  element: <Profile />
                }
              ]
            }
          ]
        },
        {
          path: '/',
          element: <AuthRedirect />,
          children: [
            {
              path: '/login',
              element: <Login />
            },
            {
              path: '/register',
              element: <Register />
            },
            {
              path: '/welcome',
              element: <Landing />
            }
          ]
        },
      ]
    }
  ])

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
