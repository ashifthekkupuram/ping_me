import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home, Login, Register } from './pages'
import NavWrapper from './components/NavWrapper'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavWrapper />,
      children: [
        {
          path: '/',
          element: <Home />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
