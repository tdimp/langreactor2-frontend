import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCardForm = ({ currentUser, decks }) => {

  useEffect(() => {
    fetch(`/cards/${id}`)
    .then(res => res.json())
    .then(data => setCard(data))
  }, []);

  const [card, setCard] = useState({});
  const [deckId, setDeckId] = useState("");

  console.log(card.foreign_lang_txt)
  
  const navigate = useNavigate();
  const { id } = useParams();

 
  const onSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      ...card,
      user_id: currentUser.id,
      deck_id: parseInt(deckId)
    }
  
    const response = await fetch(`/cards/${id}`, {
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Card updated!")
      navigate(`/decks/${deckId}`)
    } else {
      alert(data.error)
    }
  }

  const handleChange = (e) => {
    setCard({...card, 
    [e.target.name]: e.target.value})
  }

  const handleDeleteClick = () => {
    fetch(`/cards/${id}`, {
      method: "DELETE",
    });
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Target Language Text* <br />
        <input type="text" name="foreign_lang_txt" required={true} value={card.foreign_lang_txt} onChange={handleChange} />
        </label>
        <br />
        <label>Primary Language Text* <br />
        <input type="text" name="primary_lang_txt" required={true} value={card.primary_lang_txt} onChange={handleChange} />
        </label>
        <br />
        <label>Image URL <br />
        <input type="text" name ="img_url" value={card.img_url} onChange={handleChange} />
        </label>
        <select value={deckId} onChange={(e) => setDeckId(e.target.value)}>
          {decks.map(deck => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
        </select>
        <input type="submit" value="Edit Card" />
      </form>
      <button onClick={handleDeleteClick}>Delete Card</button>
    </div>
  )
}

export default EditCardForm