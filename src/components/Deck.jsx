import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './Card';

const Deck = () => {
  const [cards, setCards] = useState([]);
  const { id } = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/decks/${id}`)
    .then(res => res.json())
    .then(cards => setCards(cards))
  }, [])

  const reroute = () => {
    const path = `/decks/${id}/new`;
    navigate(path);
  }

  return (
    <div>
      <button onClick={reroute}>Create New Card</button>
      {cards.map(card => {
        return (
          <Card key={card.id} card={card} />
        )
      })}
    </div>
  )
}

export default Deck