import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewCardForm = ({ currentUser, decks }) => {

  const [card, setCard] = useState({});
  const [deckIds, setDeckIds] = useState([]);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCard({...card, 
    [e.target.name]: e.target.value})
  }

  const handleSelectChange = (e) => { // Need to make it a requirement that at least one box is checked.
    let deckIdArray = [...deckIds];
    const deckIdInt = parseInt(e.target.value);
    e.target.checked ? deckIdArray = [...deckIds, deckIdInt] : deckIdArray.splice(deckIds.indexOf(e.target.value), 1);
    setDeckIds(deckIdArray);
  }

  console.log(deckIds)

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      ...card,
      user_id: currentUser.id,
      deck_ids: deckIds // deck_ids must be an array of valid deck IDs passed to the backend via this component.
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
        <br />
          {decks.map((deck) => {
            return(
              <label key={deck.id}>
                <input
                  type="checkbox"
                  name="deck_id"
                  value={deck.id}
                  onChange={handleSelectChange}
                />
                 {deck.name}
                 <br />
              </label>
            );
          })}
        <input type="submit" value="Create Card" />
      </form>
    </div>
  )
}

export default NewCardForm