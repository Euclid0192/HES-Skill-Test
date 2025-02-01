import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet' // Header Generator
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, useHistory } from 'react-router-dom'
import './HomePage.scss'

export function HomePage(props) {
  const history = useHistory()

  const handleToReviews = () => {
    history.push('/reviews')
  }

  const handleToCritics = () => {
    history.push('/critics')
  }

  return (
    <div className="home-container">
      <Helmet>
        <meta name="description" content="Home" />
      </Helmet>
      <main>
        <h1>Welcome to some movie reviews!</h1>
      </main>
      <div className="nav-buttons">
        <button className="button" onClick={handleToReviews}>
          To Reviews
        </button>
        <button className="button" onClick={handleToCritics}>
          To Critics
        </button>
      </div>
    </div>
  )
}

export default HomePage
