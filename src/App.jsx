import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hub from './screens/Hub';
import Games from './screens/Games';
import Intel from './screens/Intel';
import Profile from './screens/Profile';

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');
  const [isLoaded, setIsLoaded] = useState(false);

  // Имитация загрузки приложения (2.5 секунды)
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

  // ЭКРАН ЗАГРУЗКИ (Белый с каплями)
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center overflow-hidden animate-out fade-out duration-1000 delay-2000">
        {/* Капли-орнамент (ЦВЕТНЫЕ) */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full blur-[60px] opacity-40 animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-400 rounded-full blur-[70px] opacity-30 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400 rounded-full blur-[80px] opacity-20" />
        
        {/* Логотип загрузки */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-black rounded-[24px] mb-6 flex items-center justify-center shadow-2xl">
             <span className="text-white text-4xl font-black italic">S L</span> {/* Santa Lucia */}
          </div>
          <h1 className="text-black text-2xl font-black tracking-tighter uppercase mb-2">SANTA LUCIA</h1>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.3em]">Quantum AI Trade</p>
          <div className="mt-12 flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  // ОСНОВНОЕ ПРИЛОЖЕНИЕ
  return (
    <div className="flex flex-col h-screen bg-[#0d0d0f] text-white overflow-hidden">
      <Header onMenuClick={() => setActiveTab('profile')} /> 
      <main className="flex-1 overflow-y-auto pb-24">
        {renderScreen()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
