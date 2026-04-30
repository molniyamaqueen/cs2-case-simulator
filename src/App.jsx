import React, { useState, useEffect, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';

import Preview from './screens/Preview';
import Arena from './screens/Arena';

// ПРО-УРОВЕНЬ: Храним маршруты в константах, чтобы избежать опечаток
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
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // ОПТИМИЗАЦИЯ: useCallback кэширует функцию, чтобы она не создавалась заново при каждом клике
  const renderCurrentScreen = useCallback(() => {
    switch (activeTab) {
      case ROUTES.PREVIEW: return <Preview />;
      case ROUTES.ARENA:   return <Arena />;
      case ROUTES.BOOTY:   return <Placeholder name="Призы (Booty)" />;
      case ROUTES.RATING:  return <Placeholder name="Рейтинг" />;
      case ROUTES.PROFILE: return <Placeholder name="Профиль" />;
      case ROUTES.ACADEMY: return <Placeholder name="Академия" />;
      case ROUTES.NEWS:    return <Placeholder name="Новости" />;
      case ROUTES.GUIDE:   return <Placeholder name="Гайды" />;
      case ROUTES.SEASON:  return <Placeholder name="Сезон" />;
      default:
        return (
          <div className="flex flex-col items-center justify-center mt-40 gap-3 animate-fadeIn">
            <span className="text-red-500 font-black uppercase tracking-widest text-sm">Ошибка 404</span>
            <p className="text-zinc-500 text-xs">Раздел "{activeTab}" не найден.</p>
            <button 
              onClick={() => setActiveTab(ROUTES.PREVIEW)}
              className="mt-4 px-6 py-2.5 bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all"
            >
              На главную
            </button>
          </div>
        );
    }
  }, [activeTab]);

  if (loading) return <LoadingScreen />;

  return (
    // ИДЕАЛЬНЫЙ КАРКАС ДЛЯ TELEGRAM
    // fixed inset-0: Прибиваем приложение к краям, блокируем "резинку" iOS
    // overscroll-none: Отключаем нативный pull-to-refresh
    <div className="fixed inset-0 bg-[#0a0a0c] text-white font-sans flex flex-col overscroll-none selection:bg-blue-500/30">
      
      {/* 
        СКРОЛЛИРУЕМАЯ ОБЛАСТЬ
        overscroll-contain: Скролл остается строго внутри этого блока
      */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain w-full max-w-md mx-auto scroll-smooth">
        {/* Внутренний контейнер. pb-32 защищает контент от перекрытия навигацией */}
        <div className="min-h-full px-4 pt-4 pb-32">
          {renderCurrentScreen()}
        </div>
      </main>

      {/* Навигация (твой компонент сам себя позиционирует через fixed) */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
    </div>
  );
}

// ОПТИМИЗАЦИЯ: React.memo предотвращает лишние перерисовки компонента
const Placeholder = React.memo(({ name }) => (
  <div className="flex flex-col items-center justify-center mt-32 animate-fadeIn px-4">
    <div className="w-full max-w-sm px-8 py-8 bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-[2rem] flex flex-col items-center gap-4 shadow-2xl relative overflow-hidden">
      {/* Декоративный блик */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
      
      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2 z-10">
        <div className="w-5 h-5 border-2 border-zinc-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
      
      <div className="flex flex-col items-center gap-1 z-10 text-center">
        <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">В разработке</span>
        <span className="text-white font-black text-xl">{name}</span>
      </div>
    </div>
  </div>
));

export default App;