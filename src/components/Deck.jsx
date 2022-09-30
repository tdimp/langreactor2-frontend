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

  const routeToCreateCardForm = () => {
    const path = `/cards/new`;
    navigate(path);
  };

  const routeToStudyDeck = () => {
    const path = `/decks/${id}/study`;
    navigate(path);
  }

  return (
    <div>
      <button onClick={routeToCreateCardForm}>Create New Card</button>
      <button onClick={routeToStudyDeck}>Study Deck</button>
      {cards.map(card => {
        return (
          <Card key={card.id} card={card} />
        )
      })}
    </div>
  )
}

export default Deck