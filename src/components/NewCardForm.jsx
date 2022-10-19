import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewCardForm = ({ currentUser, decks }) => {

  const [foreignLangTxt, setForeignLangTxt] = useState("");
  const [primaryLangTxt, setPrimaryLangTxt] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [deckId, setDeckId] = useState(decks[0].id);

  //console.log(currentUser)
  
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      foreign_lang_txt: foreignLangTxt,
      primary_lang_txt: primaryLangTxt,
      img_url: imgUrl,
      created_by: currentUser.id,
      deck_id: parseInt(deckId)
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
      navigate(`/decks/${deckId}`)
    } else {
      alert(data.error)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Target Language Text* <br />
        <input type="text" required={true} value={foreignLangTxt} onChange={(e) => setForeignLangTxt(e.target.value)} />
        </label>
        <br />
        <label>Primary Language Text* <br />
        <input type="text" required={true} value={primaryLangTxt} onChange={(e) => setPrimaryLangTxt(e.target.value)} />
        </label>
        <br />
        <label>Image URL <br />
        <input type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        </label>
        <select value={deckId} onChange={(e) => setDeckId(e.target.value)}>
          {decks.map(deck => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
        </select>
        <input type="submit" value="Create Card" />
      </form>
    </div>
  )
}

export default NewCardForm