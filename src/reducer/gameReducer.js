// Starea inițială a jocului
export const initialState = {
  cards: [],          
  flippedIndices: [], 
  moves: 0,          
};

// Reducerul care actualizează starea jocului în funcție de acțiuni
export function gameReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      // Inițializează jocul cu un nou pachet de cărți și resetează mutările și cărțile întoarse
      return {
        ...state,
        cards: action.payload,
        flippedIndices: [],
        moves: 0,
      };

    case 'FLIP_CARD':
      // Adaugă indexul cărții întoarse în lista celor întoarse momentan
      return {
        ...state,
        flippedIndices: [...state.flippedIndices, action.index],
      };

    case 'MATCH_CARDS':
      // Marchează cărțile la indicii specificați ca potrivite (matched: true)
      const updated = [...state.cards];
      action.indices.forEach(i => updated[i].matched = true);
      return {
        ...state,
        cards: updated,
        flippedIndices: [], // Resetează cărțile întoarse după potrivire
      };

    case 'RESET_FLIPPED':
      // Resetează cărțile întoarse (folosit când cele două cărți nu sunt potrivite)
      return {
        ...state,
        flippedIndices: [],
      };

    case 'INCREMENT_MOVES':
      // Crește numărul de mutări cu 1
      return {
        ...state,
        moves: state.moves + 1,
      };

    default:
      return state;
  }
}
