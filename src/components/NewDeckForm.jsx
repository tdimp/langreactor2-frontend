import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NewDeckForm = ({ currentUser }) => {

  const [deckName, setDeckName] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const deckData = {
      name: deckName,
      user_id: currentUser.id
    }

    const response = await fetch("/decks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deckData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Deck created!")
      navigate("/decks")
    } else {
      alert(data)
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Deck Name <br />
        <input type="text" required={true} value={deckName} onChange={(e) => setDeckName(e.target.value)} />
        </label>
        <input type="submit" value="Create Deck" />
      </form>
    </div>
  )
}

export default NewDeckForm