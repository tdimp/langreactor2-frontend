import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({ currentUser }) => {

  if(currentUser) {
    return (
      <div>
        <h1>{currentUser.username}</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/decks">My Decks</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    )
  } else {
    return (
      <ul>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
      </ul>
    )
  }
}

export default NavBar