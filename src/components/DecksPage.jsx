import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DecksPage = () => {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch("/decks") 
      .then((res) => res.json())
      .then(decks => setDecks(decks))
  }, [])

  decks.forEach(deck => {
    console.log(deck.cards)
  })

  return (
    <div>
      {decks.map(deck => (
      <Link to={`/decks/${deck.id}`} key={deck.id}>{deck.name}</Link>
      
    ))}</div>
  )
}

export default DecksPage