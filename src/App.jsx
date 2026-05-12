import React, { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';

import Preview from './screens/Preview';
import Arena from './screens/Arena';
import Profile from './screens/Profile';
import Season from './screens/Season';
import Guide from './screens/Guide';
import Rating from './screens/Rating';
import Academy from './screens/Academy';
import News from './screens/News';
import Booty from './screens/Booty';

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
      case ROUTES.RATING:  return <Rating />;
      case ROUTES.ACADEMY: return <Academy />;
      case ROUTES.NEWS:    return <News />;
      case ROUTES.GUIDE:   return <Guide />;
      case ROUTES.BOOTY:   return <Booty />;
      default:             return <Preview />;
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

export default App;