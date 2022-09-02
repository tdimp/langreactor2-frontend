import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({ setCurrentUser, setLoggedIn }) => {

  const navigate = useNavigate();

  const logoutUser = () => {
    setCurrentUser("");
    setLoggedIn(false);
  }

  useEffect(() => {
    fetch("/logout", {
      method: "DELETE",
    });
    logoutUser();
    navigate("/");
  });

  return (
    <div>Logout</div>
  )
}

export default Logout