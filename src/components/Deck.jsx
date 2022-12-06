import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from './Card';
import NewCardForm from './NewCardForm';

const Deck = ({ decks, currentUser }) => {
  const [cards, setCards] = useState([]);
  const { id } = useParams();
  
  const navigate = useNavigate();
  
  useEffect(() => {
      fetch(`/decks/${id}`)
      .then(res => {
        if(res.ok) {
          res.json()
          .then(cards => setCards(cards));
        } else {
          alert("Oops, something went wrong.");
          navigate('/');
        }
      });
  }, [id])

  const routeToCreateCardForm = () => {
    const path = `/cards/new`;
    navigate(path);
  };

  const handleAddCard = (newCard) => {
    setCards([newCard, ...cards])
  }

  return (
    <div>
      <NewCardForm decks={decks} handleAddCard={handleAddCard} currentUser={currentUser}  />
      {cards.map(card => {
        return (
          <Card key={card.id} card={card} />
        )
      })}
    </div>
  )
}

export default Deck