import React from 'react'

// Can add some type of interactive component here.

const Home = ({ currentUser }) => {
  
  return (
    <div>{currentUser ? `Welcome to LangReactor, ${currentUser.username}!` : "Welcome to LangReactor! Please log in or sign up." }</div>
  )
}

export default Home