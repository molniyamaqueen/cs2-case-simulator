import React, { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';

import Preview from './screens/Preview';
import Arena from './screens/Arena';
import Profile from './screens/Profile';

const ROUTES = {
  PREVIEW: 'preview',
  ARENA: 'arena',
  BOOTY: 'booty',
  RATING: 'rating',
  PROFILE: 'profile',
  ACADEMY: 'academy',
  NEWS: 'news',
  GUIDE: 'guide',
  SEASON: 'season'
};

function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(ROUTES.PREVIEW);

  useEffect(() => {
    // 1. Сообщаем Телеграму, что приложение готово (WebApp Expand)
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); // Разворачиваем на весь экран
      
      // Настраиваем цвета темы под наш даркмод
      tg.setHeaderColor('#0a0a0c');
      tg.setBackgroundColor('#0a0a0c');
    }

    // 2. Имитация загрузки ресурсов
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderCurrentScreen = useCallback(() => {
    switch (activeTab) {
      case ROUTES.PREVIEW: return <Preview />;
      case ROUTES.ARENA:   return <Arena />;
      case ROUTES.PROFILE: return <Profile />;
      case ROUTES.SEASON:  return <Season />;

      // Заглушки для остальных
      case ROUTES.BOOTY:   return <Placeholder name="Призы (Booty)" />;
      case ROUTES.RATING:  return <Placeholder name="Рейтинг" />;
      case ROUTES.ACADEMY: return <Placeholder name="Академия" />;
      case ROUTES.NEWS:    return <Placeholder name="Новости" />;
      case ROUTES.GUIDE:   return <Placeholder name="Гайды" />;
      default:
        return <Preview />;
    }
  }, [activeTab]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="fixed inset-0 bg-[#0a0a0c] text-white font-sans flex flex-col overscroll-none select-none">
      
      {/* Главный скролл-контейнер */}
<main className="scroll-container flex-1 w-full max-w-md mx-auto">
  <div className="min-h-full px-4 pt-4 pb-32">
    {renderCurrentScreen()}
  </div>
</main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
    </div>
  );
}

// Оптимизированный плейсхолдер
const Placeholder = React.memo(({ name }) => (
  <div className="flex flex-col items-center justify-center mt-32 animate-fadeIn px-4">
    <div className="w-full max-w-sm px-8 py-10 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2.5rem] flex flex-col items-center gap-4 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
      <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-2">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">Раздел</p>
        <h3 className="text-white font-black text-xl tracking-tight">{name}</h3>
      </div>
    </div>
  </div>
));

export default App;