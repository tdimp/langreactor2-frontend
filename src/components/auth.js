import { React, UseState } from "react";

export default function Auth() {

  const handleSignUp = () => {
    fetch('/signup')
  }

  return (
    <div className="Auth">
      <form>
        <label>
          Username
          <input type='text' username='username' />
        </label>
        <label>
          Password
          <input type='password' />
        </label>
        <input type='submit' value="Submit" />
      </form>
    </div>
  );
}