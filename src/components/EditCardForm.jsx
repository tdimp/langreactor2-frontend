import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// How to set deckIds in state and reflect them in the checkboxes??

const EditCardForm = ({ currentUser, decks }) => {

  const { id } = useParams()
  const navigate = useNavigate();
  
  const [card, setCard] = useState({});
  const [deckIds, setDeckIds] = useState([]);

  useEffect(() => {
    fetch(`/cards/${id}`)
    .then(res => {
      if(res.ok) {
        res.json()
        .then(data => {
          setCard(data);
          setDeckIds(data.deck_ids);
        });
      } else {
        alert("Oops, something went wrong.");
        navigate('/');
      }
    });
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (deckIds.length == 0) {
      alert("You must select at least one deck.")
    } else {
      const cardData = {
        ...card,
        user_id: currentUser.id,
        deck_ids: deckIds  // deck_ids must be an array of valid deck IDs passed to the backend via this component.
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
        navigate(`/decks`)
      } else {
        alert(data.error)
      }
    }
  }

  const handleChange = (e) => {
    setCard({...card, 
    [e.target.name]: e.target.value})
  }

  const handleSelectChange = (e) => {
    let deckIdArray = [...deckIds];
    const deckIdInt = parseInt(e.target.value);
    if(e.target.checked) {
      deckIdArray = [...deckIds, deckIdInt];
    } else {
      deckIdArray.splice(deckIds.indexOf(e.target.value), 1); // Could use deckIdArray.filter here, then setDeckIds with new filtered array
    }
    setDeckIds(deckIdArray);
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
        <br />
          {decks.map((deck) => {
            return(
              <label key={deck.id}>
                <input
                  type="checkbox"
                  name={deck.name}
                  value={deck.id}
                  onChange={handleSelectChange}
                  checked={ deckIds.includes(deck.id) ? true : false }
                />
                 {deck.name}
                 <br />
              </label>
            );
          })}
        <input type="submit" value="Edit Card" />
      </form>
      <button onClick={handleDeleteClick}>Delete Card</button>
    </div>
  )
}

export default EditCardForm