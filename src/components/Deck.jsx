import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './Card';

const Deck = () => {
  const [cards, setCards] = useState([]);
  const { id } = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`/decks/${id}`)
      .then(res => res.json())
      .then(cards => setCards(cards))
    } catch (error) {
        alert(error)
    }
  }, [])

  const routeToCreateCardForm = () => {
    const path = `/cards/new`;
    navigate(path);
  };

  return (
    <div>
      <button onClick={routeToCreateCardForm}>Create New Card</button>
      {cards.map(card => {
        return (
          <Card key={card.id} card={card} />
        )
      })}
    </div>
  )
}

export default Deck