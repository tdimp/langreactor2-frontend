import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ logoutUser, currentUser }) => {

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logoutUser()
    if (!currentUser) {
      navigate('/')
    }
  }

  if(currentUser) {
    return (
      <div className="navbar">
        <h1 id="navbar-header">{currentUser.username}</h1>
          <Link to="/">Home</Link>
          <Link to="/decks">My Decks</Link>
          <Link to="/" onClick={handleLogoutClick}>Logout</Link>
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