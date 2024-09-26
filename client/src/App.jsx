import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'

import { Home, Login, Register, Landing } from './pages'
import NavWrapper from './components/NavWrapper'
import AuthRedirect from './components/AuthRedirect'
import AuthRequired from './components/AuthRequired'
import AuthWrapper from './components/AuthWrapper'

const App = () => {

  const [darkMode, setDarkMode] = useState(true)

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
