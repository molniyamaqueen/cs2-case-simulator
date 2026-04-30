import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';

// Импортируем готовые экраны
import Preview from './screens/Preview';
import Arena from './screens/Arena';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('preview');

  // Эмуляция загрузки
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // ЖЕЛЕЗОБЕТОННЫЙ РОУТЕР
  // Эта функция четко решает, какой экран отдать, и имеет защиту от сбоев
  const renderCurrentScreen = () => {
    switch (activeTab) {
      // Готовые экраны
      case 'preview': return <Preview />;
      case 'arena':   return <Arena />;
      
      // Заглушки Main Nav
      case 'booty':   return <Placeholder name="Booty Vault" />;
      case 'rating':  return <Placeholder name="Global Rating" />;
      case 'profile': return <Placeholder name="User Profile" />;
      
      // Заглушки Sub Nav
      case 'academy': return <Placeholder name="Academy" />;
      case 'news':    return <Placeholder name="News & Updates" />;
      case 'guide':   return <Placeholder name="Platform Guide" />;
      case 'season':  return <Placeholder name="Current Season" />;
      
      // ЗАЩИТА ОТ ДУРАКА: Если стейт сломался, выдаем безопасный экран, а не черный квадрат
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center mt-40 gap-2">
            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Critical Error</span>
            <p className="text-zinc-500 text-xs">Route "{activeTab}" not found.</p>
            <button 
              onClick={() => setActiveTab('preview')}
              className="mt-4 px-4 py-2 bg-white/10 rounded-lg text-xs font-bold"
            >
              Return Home
            </button>
          </div>
        );
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col font-sans relative pb-32">
      
      {/* КОНТЕЙНЕР ЭКРАНА */}
      <main className="flex-1 w-full max-w-md mx-auto px-5">
        {renderCurrentScreen()}
      </main>

      {/* НАВИГАЦИЯ */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
    </div>
  );
}

// Универсальный компонент-заглушка (чтобы код был чистым и DRY)
const Placeholder = ({ name }) => (
  <div className="h-full flex flex-col items-center justify-center mt-40 animate-fadeIn">
    <div className="px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col items-center gap-2">
      <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Development</span>
      <span className="text-white font-black text-lg">{name}</span>
    </div>
  </div>
);

export default App;