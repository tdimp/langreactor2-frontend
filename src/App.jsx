import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

export default function App() {

  const [currentUser, setCurrentUser] = useState("");

  const authenticate = (user) => {
    setCurrentUser(user);
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login authenticate={authenticate}/>} />
      </Routes>
    </Router>
  );
}
