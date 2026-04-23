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
    // try { window.Telegram?.WebApp?.ready(); } catch (e) {}
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

  // ЭКРАН ЗАСТАВКИ (Та самая картинка с OS)
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[#0d0d0f] z-[999] flex flex-col items-center justify-center overflow-hidden animate-out fade-out duration-1000 delay-2000">
        
        {/* Изображение на весь экран */}
        <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://imagizer.imageshack.com/img923/6378/1fH99z.png" // Ссылка на твою картинку
              alt="loading screen" 
              className="w-full h-full object-cover"
            />
        </div>

        {/* Нативная верхняя панель (чтобы не казалось, что прила зависла) */}
        <div className="absolute top-0 left-0 w-full z-10 px-4 py-3 flex justify-between items-center bg-[#0d0d0f]/50 backdrop-blur-sm">
           <div className="text-zinc-600 text-xs font-bold uppercase tracking-widest">{t('nav_hub')}...</div>
           <div className="bg-white/5 px-6 py-2.5 rounded-full flex items-center gap-2 border border-white/5">
             <span className="text-base font-black tracking-wide">0 TON</span>
           </div>
        </div>
        
      </div>
    );
  }

  // ОСНОВНОЕ ПРИЛОЖЕНИЕ (Темный дизайн)
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
