import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({ loggedIn }) => {

  return (
    <div>
      <ul> 
        <li><Link to="/">Home</Link></li>
        { loggedIn ? <li><Link to="/decks">Decks</Link></li> : 
          <>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Log In</Link></li>
          </>
        }
      </ul>
    </div>
  )
}

export default NavBar