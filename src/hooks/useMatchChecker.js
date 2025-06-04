import { useEffect } from 'react';

// Hook custom care verifică dacă cele două cărți întoarse sunt o pereche

export default function useMatchChecker(cards, flippedIndices, dispatch, lockRef) {
  useEffect(() => {
    // Continuăm doar dacă sunt fix două cărți întoarse
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices;
      const firstCard = cards[first];
      const secondCard = cards[second];

      // Blocăm tabla de joc până la procesarea perechii
      lockRef.current = true;

      // Dacă valorile celor două cărți sunt egale, sunt o pereche
      if (firstCard.value === secondCard.value) {
        dispatch({ type: 'MATCH_CARDS', indices: [first, second] });
        lockRef.current = false; // Deblocăm imediat
      } else {
        // Dacă nu sunt pereche, le întoarcem înapoi după 1 secundă
        setTimeout(() => {
          dispatch({ type: 'RESET_FLIPPED' });
          lockRef.current = false; // Deblocăm după timeout
        }, 1000);
      }

      dispatch({ type: 'INCREMENT_MOVES' });
    }
  }, [flippedIndices, cards, dispatch, lockRef]); // Efectul se execută când se întorc cărțile
}
