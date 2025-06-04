import { useState, useEffect } from 'react';

const THEME_KEY = 'memory-game-theme';

// Hook custom pentru gestionarea temei aplicației (light/dark)
export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved ? saved : 'light';
  });

  // Salvăm tema curentă în localStorage de fiecare dată când se schimbă
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  
  return { theme, toggleTheme };
}
