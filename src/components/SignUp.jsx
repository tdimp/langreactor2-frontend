import React, { useState } from 'react'
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
      loginUser(data)
    } else {
      setErrors(data.error)
      alert(errors)
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