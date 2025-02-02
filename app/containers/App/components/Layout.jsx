import React from 'react'
import NavBar from '../../../components/NavBar/NavBar'

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
