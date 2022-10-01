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
  }, [])

 

  return (
    <div>
        <button onClick={() => console.log("click")}>Click Me</button>
    </div>
  )
}

export default StudyDeck