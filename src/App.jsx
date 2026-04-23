import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hub from './screens/Hub';
import Games from './screens/Games';
import Intel from './screens/Intel';
import Profile from './screens/Profile';
import { useLanguage } from './i18n/LanguageContext';

const App = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('hub');
  const [isLoaded, setIsLoaded] = useState(false);

  // Имитация заставки (splash screen) - 2.5 секунды
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'games': return <Games />;
      case 'hub': return <Hub />;
      case 'intel': return <Intel />;
      case 'profile': return <Profile />;
      default: return <Hub />;
    }
  };

  // ЭКРАН ЗАСТАВКИ (Твоя крутая картинка OS)
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[#0d0d0f] z-[999] flex flex-col items-center justify-center overflow-hidden animate-out fade-out duration-1000 delay-2000">
        
        {/* Изображение на весь экран (Берется из папки public) */}
        <div className="absolute inset-0 w-full h-full">
            <img 
             src="./splash.png" 
              alt="loading screen" 
              className="w-full h-full object-cover"
            />
        </div>

        {/* Нативная верхняя панель (чтобы было стильно) */}
        <div className="absolute top-0 left-0 w-full z-10 px-4 py-3 flex justify-between items-center bg-[#0d0d0f]/50 backdrop-blur-sm">
           <div className="text-zinc-600 text-xs font-bold uppercase tracking-widest">{t('nav_hub')}...</div>
           <div className="bg-white/5 px-6 py-2.5 rounded-full flex items-center gap-2 border border-white/5">
             <span className="text-base font-black tracking-wide">0 TON</span>
           </div>
        </div>
        
      </div>
    );
  }

  // ОСНОВНОЕ ПРИЛОЖЕНИЕ (Твой темный дизайн)
  return (
    <div className="flex flex-col h-screen bg-[#0d0d0f] text-white overflow-hidden font-sans">
      <Header onMenuClick={() => setActiveTab('profile')} /> 
      <main className="flex-1 overflow-y-auto pb-24 transition-opacity duration-300">
        {renderScreen()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
