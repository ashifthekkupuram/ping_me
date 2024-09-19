import React from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from './NavBar'

const NavWrapper = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export default NavWrapper
