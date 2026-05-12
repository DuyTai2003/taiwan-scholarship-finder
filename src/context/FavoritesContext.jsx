import { createContext, useContext, useState, useEffect } from 'react';
import { safeJsonParse } from '../utils/safeFetchJSON';

const FavoritesContext = createContext();

const STORAGE_KEY = 'scholarshipFavorites';

function loadFavorites() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = safeJsonParse(raw, []);
  // Guard: đảm bảo kết quả là mảng
  if (!Array.isArray(parsed)) {
    console.warn('[FavoritesContext] Dữ liệu localStorage không phải mảng, reset về [].');
    return [];
  }
  return parsed;
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
