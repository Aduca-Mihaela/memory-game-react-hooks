import React, { useReducer, useRef, useCallback, useEffect } from 'react';
import Card from './Card';
import ScorePanel from './ScorePanel';

// Hook-uri custom
import useShuffleDeck from '../hooks/useShuffleDeck';
import useMatchChecker from '../hooks/useMatchChecker';
import useGameStatus from '../hooks/useGameStatus';
import useLocalStorageState from '../hooks/useLocalStorageState';
import useTheme from '../hooks/useTheme'; // pentru dark/light mode

import { gameReducer, initialState } from '../reducer/gameReducer';

export default function GameBoard() {
  // Obținem un pachet de cărți amestecat la început
  const { deck: initialDeck, reshuffle } = useShuffleDeck();

  // Stare persistentă în localStorage (pentru salvarea progresului)
  const [persistedState, setPersistedState] = useLocalStorageState('memory-game-state', {
    ...initialState,
    cards: initialDeck,
    moves: 0,
  });

  const [state, dispatch] = useReducer(gameReducer, persistedState);

  // Folosit pentru a bloca clickuri când se compară două cărți
  const lockBoard = useRef(false);

  // Salvăm progresul jocului în localStorage la fiecare modificare
  useEffect(() => {
    setPersistedState(state);
  }, [state, setPersistedState]);

  // Verifică dacă cele două cărți întoarse sunt o pereche
  useMatchChecker(state.cards, state.flippedIndices, dispatch, lockBoard);

  // Verifică dacă toate perechile au fost găsite
  const gameFinished = useGameStatus(state.cards);

  // Când utilizatorul dă click pe o carte
  const handleCardClick = useCallback(
    (index) => {
      // Ignorăm clickul dacă:
      if (lockBoard.current) return; // - tabla e blocată
      if (state.flippedIndices.includes(index)) return; // - cartea e deja întoarsă
      if (state.cards[index].matched) return; // - cartea a fost deja potrivită

      // Trimitem acțiunea de întoarcere a cărții
      dispatch({ type: 'FLIP_CARD', index });
    },
    [state]
  );

  // Resetarea jocului cu un nou pachet de cărți
  const restartGame = () => {
    const newDeck = reshuffle();
    dispatch({ type: 'INIT', payload: newDeck });
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`game-container ${theme}`}>
      <h1>🎮 Memory Game</h1>

      {/* Comutator light/dark mode */}
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>

      {/* Panel cu scor și buton de restart */}
      <ScorePanel
        moves={state.moves || 0}
        matched={state.cards.filter(c => c.matched).length / 2}
        restart={restartGame}
      />

      {/* Tabla de joc - grilă de cărți */}
      <div className="grid">
        {state.cards.map((card, index) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={state.flippedIndices.includes(index) || card.matched}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {/* Mesaj de final când toate perechile sunt găsite */}
      {gameFinished && (
        <div className="congrats-message">
          🎉 Felicitări! Ai terminat jocul! 🎉
        </div>
      )}
    </div>
  );
}
