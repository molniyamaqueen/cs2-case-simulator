import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hub from './screens/Hub';
import Games from './screens/Games';
import Intel from './screens/Intel';
import Profile from './screens/Profile';
import FairPlayModal from './components/FairPlayModal';
import { useLanguage } from './i18n/LanguageContext';

const App = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('hub');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Для левого меню (Пункт 13)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // ЧИСТЫЙ ЭКРАН ЗАГРУЗКИ (Без полос и кнопок TON)
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[#0d0d0f] z-[9999] flex items-center justify-center">
        <img src="/splash.png" alt="loading" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0f] text-white overflow-hidden font-sans">
      <Header onMenuClick={() => setIsMenuOpen(true)} /> 
      <main className="flex-1 overflow-y-auto pb-24 transition-opacity duration-300">
        {activeTab === 'games' && <Games />}
        {activeTab === 'hub' && <Hub />}
        {activeTab === 'intel' && <Intel />}
        {activeTab === 'profile' && <Profile />}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Левое меню (Честность и О проекте) */}
      {isMenuOpen && <FairPlayModal onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
};

export default App;
