import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DecksPage from "./components/DecksPage";

export default function App() {

  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const loginUser = user => {
    setCurrentUser(user);
    setLoggedIn(true);
  };

  useEffect(() => {
    fetch('/auth')
    .then(res => {
      if(res.ok){
        res.json().then(user => loginUser(user));
      }
    });
  }, [])

  //if(!currentUser) {
  //  return(<Login setCurrentUser={setCurrentUser} />)
  //}

  return (
    <Router>
      <NavBar currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/decks" element={<DecksPage />} />
      </Routes>
    </Router>
  );
}
