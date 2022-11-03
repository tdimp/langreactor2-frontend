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
import EditCardForm from "./components/EditCardForm";
import NewDeckForm from "./components/NewDeckForm";
import RequireAuth from "./components/RequireAuth";

export default function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [decks, setDecks] = useState([]);

  const loginUser = (user) => {
    setCurrentUser(user);
  }

  useEffect(() => {
    fetch('/auth')
      .then(res => {
       if(res.ok){
         res.json().then(user => setCurrentUser(user));
        }
      });
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      fetch('/decks')
      .then(res => res.json())
      .then(data => setDecks([...data]))
    }
  }, [currentUser])

  return (
    <Router>
      <NavBar currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/signup" element={<SignUp loginUser={loginUser} />} />
        <Route path="/login" element={<Login loginUser={setCurrentUser} />} />
        <Route path="/logout" element={<Logout logoutUser={setCurrentUser} currentUser={currentUser} />} />
        
        <Route path="/decks" 
          element={
            <RequireAuth currentUser={currentUser}>
              <DecksPage decks={decks} />
            </RequireAuth>
            } 
        />

        <Route path="/decks/:id" 
          element={
            <RequireAuth currentUser={currentUser}>
              <Deck />
            </RequireAuth>
          } 
        />

        <Route path="/cards/new" 
          element={
            <RequireAuth currentUser={currentUser}>
              <NewCardForm currentUser={currentUser} decks={decks} />
            </RequireAuth>
          } 
        />

        <Route path="/cards/:id/edit" 
          element={
            <RequireAuth currentUser={currentUser}>
              <EditCardForm currentUser={currentUser} decks={decks} />
            </RequireAuth>
          } 
        />

        <Route path="/decks/new" 
          element={
            <RequireAuth currentUser={currentUser}>
              <NewDeckForm currentUser={currentUser} />
            </RequireAuth>
          } 
        />
      </Routes>
    </Router>
  );
}
