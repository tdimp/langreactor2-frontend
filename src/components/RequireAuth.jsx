import React from 'react'
import Login from './Login';

const RequireAuth = ({ currentUser, children }) => {

  if (!currentUser) {
    return <Login />;
  }
  return children;
}

export default RequireAuth