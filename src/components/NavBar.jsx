import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({ currentUser }) => {

  return (
    <div>
      {currentUser ? <h1>{currentUser.username}</h1> : <div />}
      <ul> 
        <li><Link to="/">Home</Link></li>
        { currentUser ? <li><Link to="/decks">My Decks</Link></li> : 
          <>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Log In</Link></li>
          </>
        }
      </ul>
      { currentUser ? <h1>{currentUser.username}'s Decks</h1> : <div></div>}
    </div>
  )
}

export default NavBar