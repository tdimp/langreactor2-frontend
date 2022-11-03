import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({ currentUser }) => {

  if(currentUser) {
    return (
      <div className="navbar">
        <h1 id="navbar-header">{currentUser.username}</h1>
          <Link to="/">Home</Link>
          <Link to="/decks">My Decks</Link>
          <Link to="/logout">Logout</Link>
      </div>
    )
  } else {
    return (
      <div className="navbar">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </div>
    )
  }
}

export default NavBar