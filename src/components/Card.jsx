import React, { useState } from 'react'

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlipClick = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <div>
      {isFlipped ? <h1>{card.primary_lang_txt}</h1> : <h1>{card.foreign_lang_txt}</h1>}
      <button onClick={handleFlipClick}>Flip!</button>
    </div>
  )
}

export default Card