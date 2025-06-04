import { useEffect, useState } from 'react';

// Hook custom care verifică dacă jocul s-a încheiat
export default function useGameStatus(cards) {
  // Stare locală care indică dacă toate perechile au fost potrivite
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    // Verifică dacă toate cărțile sunt potrivite
    const allMatched = cards.length > 0 && cards.every(card => card.matched);

    // Actualizează starea jocului
    setGameFinished(allMatched);
  }, [cards]); // Rulăm efectul de fiecare dată când se schimbă cărțile

  // Returnăm true dacă jocul s-a terminat
  return gameFinished;
}
