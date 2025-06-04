Memory Game PoC App with React Hooks
# Memory Game - React PoC Application Using Hooks

## Descriere

Acesta este un Proof of Concept (PoC) al unui joc simplu de memorie (Memory Game) dezvoltat folosind React. Scopul principal al proiectului este să demonstreze utilizarea avansată a React Hooks în gestionarea stării, efectelor secundare și optimizării performanței în aplicațiile React.
Jocul oferă o experiență interactivă unde utilizatorul întoarce cărți pentru a găsi perechi, urmărind mișcările și progresul. Starea jocului este păstrată în localStorage pentru a menține progresul chiar și după refresh-ul paginii.


### Folosirea hook-urilor React

- **`useState`**: Gestionarea stării locale (ex: deck, flipped cards).
- **`useEffect`**: Efecte secundare cum ar fi resetarea jocului sau verificarea perechilor.
- **`useRef`**: Blocarea interacțiunii cu tabla pe durata animațiilor/verificărilor.
- **`useReducer`**: Gestionarea logicii complexe de stare pentru joc, ideală pentru o stare cu multiple sub-stări.
- **`useCallback`**: Optimizarea performanței prin memorarea funcțiilor handler.

### Hook-uri personalizate (custom hooks)

- `useShuffleDeck`:
  - Crează un deck de cărți cu perechi de emoji-uri.
  - Amestecă cărțile random.
  - Oferă o funcție de reshuffle pentru restartul jocului.
- `useMatchChecker`:
  - Monitorizează când două cărți sunt întoarse.
  - Verifică dacă formează o pereche.
  - Blochează tableta de joc în timpul animației de întoarcere.
  - Actualizează starea jocului prin dispatch-uri către reducer.
- `useGameStatus`:
  - Primește lista de cărți și verifică dacă toate perechile au fost găsite.
  - Returnează boolean pentru afișarea mesajului de câștig.
- `useLocalStorageState`:
  - Combina useReducer cu persistența în localStorage.
  - Incarcă starea salvată la inițializare.
  - Salvează starea în localStorage la fiecare modificare.
 
# Reducer
- `gameReducer` — Gestionarea tuturor acțiunilor legate de joc: inițializare, întoarcere cărți, potrivire, resetare și numărare mutări.





### Structura Aplicației

- **components/** — conține componentele funcționale pentru interfața utilizatorului:
  - `Card.jsx` — componenta care reprezintă o carte de joc.
  - `GameBoard.jsx` — tabla de joc unde sunt afișate toate cărțile.
  - `ScorePanel.jsx` — afișează scorul și informațiile despre joc.

- **hooks/** — conține hook-urile personalizate pentru logica aplicației:
  - `useShuffleDeck.js` — hook pentru amestecarea cărților.
  - `useMatchChecker.js` — hook care verifică dacă două cărți sunt pereche.
  - `useGameStatus.js` — hook pentru gestionarea stării generale a jocului.
  - `useLocalStorageReducer.js` — hook pentru sincronizarea reducer-ului cu `localStorage`.

- **reducer/** — conține reducer-ul pentru gestionarea stării complexe a jocului:
  - `gameReducer.js` — logica reducer-ului care actualizează starea jocului.

- **App.jsx** — componenta principală care leagă toate componentele și hook-urile.
- **App.css** — stilurile aplicației.
- **index.js** — punctul de intrare al aplicației React.





## Structura aplicației

- `GameBoard.jsx` — Componenta principală care gestionează logica jocului folosind un **reducer** și hook-uri React.
- `Card.jsx` — Componentă pentru reprezentarea fiecărei cărți.
- `ScorePanel.jsx` — Afișează numărul de mutări, numărul de perechi potrivite și butonul de restart.
- `useShuffleDeck.js` — Hook personalizat pentru crearea și reshuffle-ul deck-ului de cărți.
- `useMatchChecker.js` — Hook personalizat care verifică dacă două cărți întoarse sunt potrivite și blochează tabla pe durata verificării.
- `gameReducer.js` — Reducer pentru a gestiona starea jocului (cărtile, cărțile întoarse, mutările, potrivirile).

---

## Fluxul Aplicației

1. Se inițializează starea jocului cu cărți amestecate și mutări setate la zero.
2. Jucătorul întoarce o carte; starea se actualizează.
3. După întoarcerea a două cărți, `useEffect` verifică dacă sunt pereche:
   - Dacă da, cărțile rămân întoarse.
   - Dacă nu, după un delay, cărțile sunt întoarse înapoi.
4. Jocul continuă până când toate perechile sunt găsite.
5. Jucătorul poate reseta jocul, iar starea este resetată complet.


- Folosește exclusiv componente funcționale.
- Utilizează toate hook-urile relevante (`useState`, `useEffect`, `useReducer`, `useContext`).
- Prezintă o structură clară și un flux logic definit.
- Servește ca exemplu clar și didactic pentru învățarea hooks.

---


