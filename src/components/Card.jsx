export default function Card({ value, isFlipped, onClick }) {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={e => { if(e.key === 'Enter') onClick(); }}
    >
      {isFlipped ? value : '❓'}
    </div>
  );
}
