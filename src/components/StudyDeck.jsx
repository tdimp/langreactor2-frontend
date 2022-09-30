import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

const StudyDeck = () => {

  const [deck, setDeck] = useState([]);
  const [studyCard, setStudyCard] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`/decks/${id}`)
    .then(res => res.json())
    .then(data => setDeck(data))
  }, [studyCard])

  const nextCard = () => {
    for (let i = 0; i < deck.length; i++) {
      setStudyCard(deck[i]);
    };
    console.log(studyCard)
  }

  return (
    <div>
        <button type="button" onClick={nextCard} />
    </div>
  )
}

export default StudyDeck