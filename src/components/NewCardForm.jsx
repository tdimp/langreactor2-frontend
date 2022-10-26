import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Need to add some checkbox component to allow users to select multiple decks to
// which the card can be attributed to, to reflect the many-to-many association.

const NewCardForm = ({ currentUser, decks }) => {

  const [card, setCard] = useState({});
  const [deckIds, setDeckIds] = useState([]);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCard({...card, 
    [e.target.name]: e.target.value})
  }

  const handleSelectChange = (e) => {
    setDeckIds(...e.target.value);
    console.log(deckIds)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      ...card,
      user_id: currentUser.id,
      deck_ids: [1,2] // deck_ids must be an array of valid deck IDs passed to the backend via this component.
    }
  
    const response = await fetch("/cards", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Card created!")
      navigate(`/decks`)
    } else {
      alert(data.error)
      console.log(cardData)
    }
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
        <input type="text" name="img_url" value={card.img_url} onChange={handleChange} />
        </label>
        <select defaultValue={decks[0].id} onChange={handleSelectChange}>
          {decks.map(deck => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
        </select>
        <input type="submit" value="Create Card" />
      </form>
    </div>
  )
}

export default NewCardForm