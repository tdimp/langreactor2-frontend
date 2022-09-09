import React, { useState } from 'react'

const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlipClick = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <div>
      {isFlipped ? <h1>Hello</h1> : <h1>Hola</h1>}
      <button onClick={handleFlipClick}>Flip!</button>
    </div>
  )
}

export default Card