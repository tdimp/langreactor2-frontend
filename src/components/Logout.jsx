import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({ logoutUser }) => {

  const navigate = useNavigate();

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