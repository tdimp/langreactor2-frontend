import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ authenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };

    const response = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (response.ok) {
      authenticate(user.username);
      navigate('/');
    } else {
      setErrors(data.error.login)
      alert(data.error.login)
    };
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
      <label>
        Username*
        <br />
        <input type="text" required={true} value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password*
        <br />
        <input type="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Log In!" />
      </form>
    </div>
  )
}

export default Login