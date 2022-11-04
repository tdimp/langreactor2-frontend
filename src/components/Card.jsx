import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const navigate = useNavigate();


  const handleFlipClick = () => {
    setIsFlipped(!isFlipped);
  }

  const handleEditReroute = () => {
    const path = `/cards/${card.id}/edit`
    navigate(path)    
  }

  return (
    <div className={ isFlipped ? "flipped-card" : "default-card" }>
      <img src={card.img_url} />
      {isFlipped ? <h1 className='card-text'>{card.primary_lang_txt}</h1> : <h1 className='card-text'>{card.foreign_lang_txt}</h1>}
      <button onClick={handleFlipClick}>Flip!</button>
      <button onClick={handleEditReroute}>Edit Card</button>
    </div>
  )
}

export default Card