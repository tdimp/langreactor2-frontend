import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCardForm = ({ decks }) => {

  useEffect(() => {
    fetch(`/cards/${id}`)
    .then(res => res.json())
    .then(data => setCard(data))
  }, []);

  const [card, setCard] = useState("")
  const [foreignLangTxt, setForeignLangTxt] = useState(card.foreign_lang_txt);
  const [primaryLangTxt, setPrimaryLangTxt] = useState(card.primary_lang_txt);
  const [imgUrl, setImgUrl] = useState(card.img_url);
  const [deckId, setDeckId] = useState(decks[0].id);

  console.log(card.foreign_lang_txt)
  
  const navigate = useNavigate();
  const { id } = useParams();

 
  const onSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      foreign_lang_txt: foreignLangTxt,
      primary_lang_txt: primaryLangTxt,
      img_url: imgUrl,
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
      console.log(data)
    }
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
        <input type="submit" value="Edit Card" />
      </form>
      <button onClick={handleDeleteClick}>Delete Card</button>
    </div>
  )
}

export default EditCardForm