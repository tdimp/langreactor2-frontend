import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Logout from "./components/Logout";
import DecksPage from "./components/DecksPage";
import Deck from "./components/Deck";
import NewCardForm from "./components/NewCardForm";
import StudyDeck from "./components/StudyDeck";
import EditCardForm from "./components/EditCardForm";

export default function App() {

  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [decks, setDecks] = useState([]);

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

  useEffect(() => {
    fetch('/decks')
      .then(res => res.json())
      .then(data => setDecks(data))
  }, [])

  console.log(currentUser.id)

  return (
    <Router>
      <NavBar currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/signup" element={<SignUp loginUser={loginUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/logout" element={<Logout setCurrentUser={setCurrentUser} setLoggedIn={setLoggedIn} />} />
        <Route path="/decks" element={<DecksPage decks={decks} />} />
        <Route path="/decks/:id" element={<Deck />} />
        <Route path="/cards/new" element={<NewCardForm currentUser={currentUser} />} />
        <Route path="/decks/:id/study" element={<StudyDeck />} />
        <Route path="/cards/:id/edit" element={<EditCardForm />} />
      </Routes>
    </Router>
  );
}
