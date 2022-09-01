import React, { useState } from 'react'

const Home = ({ currentUser }) => {
  console.log(currentUser)
  return (
    <div>{currentUser ? `Welcome to LangReactor, ${currentUser.username}!` : "Welcome to LangReactor! Please log in or sign up." }</div>
  )
}

export default Home