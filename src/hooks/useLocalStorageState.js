import { useState, useEffect } from 'react';

// Hook custom care sincronizează o stare React cu localStorage

export default function useLocalStorageState(key, defaultValue) {
  // Inițializăm starea citind din localStorage (dacă există ceva salvat)
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.warn('Eroare la citirea din localStorage pentru cheia “' + key + '”: ', error);
      return defaultValue;
    }
  });

  // La fiecare modificare a stării sau a cheii, salvăm noua valoare în localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn('Eroare la salvarea în localStorage pentru cheia “' + key + '”: ', error);
    }
  }, [key, state]);

  return [state, setState];
}
