import React, { useState } from 'react'

const Home = ({ currentUser }) => {

  return (
    <div>{currentUser ? `Welcome to LangReactor, ${currentUser}!` : "Welcome to LangReactor! Please log in or sign up." }</div>
  )
}

export default Home