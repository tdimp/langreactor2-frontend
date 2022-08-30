import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await console.log("hi")
  }

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