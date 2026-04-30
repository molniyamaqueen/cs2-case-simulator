import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Сохраняем выбор в память телефона, чтобы при перезагрузке язык не слетал
  const [lang, setLang] = useState(localStorage.getItem('app_lang') || 'EN');

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations['EN']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);