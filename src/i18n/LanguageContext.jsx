import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('EN'); // Дефолтный язык

  // Пытаемся получить язык из Telegram WebApp при загрузке
  useEffect(() => {
    try {
      const userLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
      if (userLang) {
        // Мы поддерживаем EN, RU, UA, KR, CN, FA. Если язык юзера другой, оставляем EN
        if (['ru', 'uk'].includes(userLang)) setLang('RU');
        else if (userLang === 'ko') setLang('KR');
        else if (userLang === 'zh') setLang('CN');
        else if (userLang === 'fa') setLang('FA');
        else setLang('EN');
      }
    } catch (e) {
      console.warn("LanguageContext: Could not get Telegram language.");
    }
  }, []);

  const t = (key) => {
    return translations[lang]?.[key] || translations['EN']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
