import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

const Deck = () => {
  const [cards, setCards] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/decks/${id}`)
    .then(res => res.json())
    .then(cards => setCards(cards))
  }, [])

  return (
    <div>
      {cards.map(card => {
        return (
          <Card key={card.id} card={card} />
        )
      })}
    </div>
  )
}

export default Deck