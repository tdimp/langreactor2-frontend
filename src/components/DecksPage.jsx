import React from 'react';
import { Link } from 'react-router-dom';

const DecksPage = ({ decks }) => {

  return (
    <div>
      {decks.map(deck => (
      <Link to={`/decks/${deck.id}`} key={deck.id}>{deck.name}</Link>
    ))}</div>
  )
}

export default DecksPage