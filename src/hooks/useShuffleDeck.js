import { useState } from 'react';

const emojis = ['🍎', '🍌', '🍇', '🍒', '🍉', '🥝', '🍍', '🍓'];

// Funcție care creează un nou pachet de cărți amestecate
function shuffleDeck() {
  const deck = [...emojis, ...emojis]
    .map((value, index) => ({ id: index, value, matched: false }))
    .sort(() => Math.random() - 0.5); 
  return deck;
}

// Hook custom care oferă un pachet de cărți și o funcție de reshuffle
export default function useShuffleDeck() {
  // Inițializăm starea cu un pachet amestecat
  const [deck, setDeck] = useState(shuffleDeck());

  // Funcție care generează un nou pachet și actualizează starea
  const reshuffle = () => {
    const newDeck = shuffleDeck();
    setDeck(newDeck);
    return newDeck;
  };

  return { deck, reshuffle };
}
