import React from 'react';
import { Link } from 'react-router-dom';

const DecksPage = ({ decks }) => {

  return (
    <div>
      {decks.map(deck => (
      <Link to={`/decks/${deck.id}`} className="link" key={deck.id}>{deck.name}</Link>
    ))}
      <Link to={"/decks/new"} className="link">New Deck</Link>
    </div>
  )
}

export default DecksPage