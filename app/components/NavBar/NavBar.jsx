import React from 'react'
import { useHistory } from 'react-router-dom'

import './NavBar.scss'

const NavBar = () => {
  const history = useHistory()

  return (
    <nav className="navbar">
      <button onClick={() => history.push('/')} title="Home">
        Home
      </button>
      <button onClick={() => history.push('/reviews')} title="Reviews">
        Reviews
      </button>
      <button onClick={() => history.push('/critics')} title="Critics">
        Critics
      </button>
    </nav>
  )
}

export default NavBar
