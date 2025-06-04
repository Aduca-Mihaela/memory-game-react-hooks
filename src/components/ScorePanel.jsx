// Componenta ScorePanel afișează scorul curent și un buton de restart
export default function ScorePanel({ moves, matched, restart }) {
  return (
    <div className="score-panel">
      {/* Informații despre scor: număr de mutări și perechi găsite */}
      <div className="score-info">
        <span className="moves">
          Moves: <span className="moves-count">{moves}</span>
        </span>
        <span className="matched">
          Matched: <span className="matched-count">{matched}</span>
        </span>
      </div>

      {/* Buton pentru restartarea jocului */}
      <button onClick={restart} className="restart-button">
        Restart
      </button>
    </div>
  );
}
