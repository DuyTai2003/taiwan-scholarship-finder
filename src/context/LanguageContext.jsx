import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

function detectLanguage() {
  const saved = localStorage.getItem('prefLang');
  if (saved) return saved;
  const lang = navigator.language || navigator.userLanguage || '';
  if (lang.includes('vi')) return 'vi';
  if (lang.includes('zh-CN')) return 'zh-CN';
  if (lang.includes('zh-TW') || lang.includes('zh')) return 'zh-TW';
  return 'en';
}

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(detectLanguage);

  const setLang = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('prefLang', lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
