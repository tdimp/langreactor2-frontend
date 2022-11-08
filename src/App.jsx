import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DecksPage from "./components/DecksPage";
import Deck from "./components/Deck";
import NewCardForm from "./components/NewCardForm";
import EditCardForm from "./components/EditCardForm";
import NewDeckForm from "./components/NewDeckForm";

export default function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch('/auth')
      .then(res => {
       if(res.ok){
         res.json().then(user => setCurrentUser(user));
        }
      });
  }, [])

  useEffect(() => {
    if (currentUser) {
      try {
        fetch('/decks')
        .then(res => res.json())
        .then(data => setDecks([...data])) 
      } catch (error) {
          alert(`Oops, something went wrong. ${error}`)
      }
    }
  }, [currentUser])

  const handleDeckCreate = (newDeck) => {
    setDecks([...decks, newDeck]);
  }

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
    .then(res => {
      if (res.ok) {
        setCurrentUser(null);
        alert("You have successfully logged out.")
      } else {
        alert(`Oops. Something went wrong.`)
      }});
  }

  return (
    <Router>
      <NavBar currentUser={currentUser} logoutUser={handleLogout} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/signup" element={<SignUp loginUser={setCurrentUser} />} />
        <Route path="/login" element={<Login loginUser={setCurrentUser} />} />

        { currentUser ?
          <>
            <Route path="/decks" element={ <DecksPage decks={decks} /> } />
            <Route path="/decks/:id" element={<Deck /> } />
            <Route path="/decks/new" element={<NewDeckForm currentUser={currentUser} handleDeckCreate={handleDeckCreate} /> } />
            <Route path="/cards/new" element={<NewCardForm currentUser={currentUser} decks={decks} /> } />
            <Route path="/cards/:id/edit" element={<EditCardForm currentUser={currentUser} decks={decks} /> } />
          </> : null
        }

      </Routes>
    </Router>
  );
}
