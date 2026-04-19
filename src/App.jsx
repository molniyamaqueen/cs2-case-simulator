import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hub from './screens/Hub';
// Сюда добавим Games, Intel и Profile когда создашь файлы в screens/

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('#000000');
    }
  }, []);

  const renderScreen = () => {
    switch (activeTab) {
      case 'hub': return <Hub />;
      case 'games': return <div className="pt-20 text-center opacity-20 font-black uppercase tracking-[0.5em]">Games Section</div>;
      case 'intel': return <div className="pt-20 text-center opacity-20 font-black uppercase tracking-[0.5em]">Intel Section</div>;
      case 'profile': return <div className="pt-20 text-center opacity-20 font-black uppercase tracking-[0.5em]">Profile Section</div>;
      default: return <Hub />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* HEADER (можно тоже вынести в компонент) */}
      <header className="flex items-center justify-between px-6 pt-6 pb-2 z-40 bg-black">
         <div className="text-zinc-500 font-black italic tracking-tighter text-xl">ONLYSKINS</div>
         <div className="bg-[#111112] border border-white/5 px-4 py-2 rounded-2xl text-sm font-black italic tracking-tight">0 TON</div>
      </header>
      
      <main className="flex-1 overflow-y-auto pb-32">
        {renderScreen()}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
