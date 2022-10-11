import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ loginUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const reroute = () => {
    let path = '/signup';
    navigate(path);
  };

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
      loginUser(user);
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
      <h4>Don't have an account?</h4>
      <button onClick={reroute}>Sign Up</button>
      </form>
    </div>
  )
}

export default Login