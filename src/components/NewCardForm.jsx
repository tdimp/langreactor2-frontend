import React, { useState, useEffect } from 'react'

const NewCardForm = () => {

  const [foreignLangTxt, setForeignLangTxt] = useState("");
  const [primaryLangTxt, setPrimaryLangTxt] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [deckId, setDeckId] = useState(1);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    fetch("/decks")
    .then(res => res.json())
    .then(data => setDecks(data))
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const clientData = {
      cardData: {
        foreign_lang_txt: foreignLangTxt,
        primary_lang_txt: primaryLangTxt,
        img_url: imgUrl,
      },
      deckData: {
        deck_id: parseInt(deckId)
      }
    }
    console.log(clientData)
    const response = await fetch("/cards", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Card created!")
    } else {
      console.log(data)
    }
  }
  console.log(parseInt(deckId))
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Target Language Text* <br />
        <input type="text" required={true} value={foreignLangTxt} onChange={(e) => setForeignLangTxt(e.target.value)} />
        </label>
        <br />
        <label>Primary Language Text <br />
        <input type="text" value={primaryLangTxt} onChange={(e) => setPrimaryLangTxt(e.target.value)} />
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