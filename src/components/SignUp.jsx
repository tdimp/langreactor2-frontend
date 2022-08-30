import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const reroute = () => {
    let path = '/login';
    navigate(path);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      primary_language: primaryLanguage
    }
    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (response.ok) {
      navigate('/');
    } else {
      setErrors(data.error)
      alert(errors)
    }      
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
      <br />
      <label>
        Primary Language
        <br />
        <input type="text" value={primaryLanguage} onChange={(e) => setPrimaryLanguage(e.target.value)} />
      </label>
      <input type="submit" value="Sign Up!" />
      </form>
      <h4>Already have an account?</h4>
      <button onClick={reroute}>Log In</button>
    </div>
  )
}

export default SignUp