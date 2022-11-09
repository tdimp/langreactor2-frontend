import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const SignUp = ({ loginUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [primaryLanguage, setPrimaryLanguage] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasAccount, setHasAccount] = useState(false);

  const handleHasAccountClick = () => {
    setHasAccount(!hasAccount);
  }

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    let user = {
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
      fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      .then(loginUser(data))
      .then(navigate('/'))
    } else {
      setErrors(data.error)
      alert(data.error)
    }      
  }

  if(!hasAccount) {
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
        <button onClick={handleHasAccountClick}>Log In</button>
      </div>
    )
  } else return <Login loginUser={loginUser} />
  
}

export default SignUp