import React, { useState, useEffect } from 'react'

const DecksPage = () => {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch("/decks") 
      .then((res) => res.json())
      .then(decks => setDecks(decks))
  }, [])

  return (
    <div>
      {decks.map(deck => (
      <h3 key={deck.id}>{deck.name}</h3>
      
    ))} </div>
  )
}

export default DecksPage