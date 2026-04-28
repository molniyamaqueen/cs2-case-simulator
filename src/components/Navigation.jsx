import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Swords, 
  Gem, 
  Trophy, 
  GraduationCap, 
  Newspaper, 
  BookOpen, 
  Calendar,
  User
} from 'lucide-react';

const triggerHaptic = () => {
  try {
    if (window?.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    } else if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  } catch (error) {
    // Безопасный фоллбэк, если HapticFeedback недоступен
  }
};

const rootItems = [
  { id: 'preview', label: 'Preview', icon: LayoutDashboard },
  { id: 'arena', label: 'Arena', icon: Swords },
  { id: 'booty', label: 'Booty', icon: Gem },
  { id: 'rating', label: 'Rating', icon: Trophy },
];

const subItems = [
  { id: 'academy', label: 'Academy', icon: GraduationCap },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'guide', label: 'Guide', icon: BookOpen },
  { id: 'season', label: 'Season', icon: Calendar },
];

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isSubNavigation, setIsSubNavigation] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState('preview');
  const [activeSubTab, setActiveSubTab] = useState('academy');

  // Эффект для синхронизации внешнего стейта (если активна кнопка профиля и тд)
  useEffect(() => {
    if (activeTab === 'profile') {
      setActiveMainTab('profile');
    }
  }, [activeTab]);

  const handleItemClick = (id) => {
    triggerHaptic();

    if (!isSubNavigation) {
      // Логика ROOT панели
      if (id === 'preview') {
        setIsSubNavigation(true);
        setActiveMainTab('preview');
        setActiveSubTab('academy');
        setActiveTab('academy'); // Передаем активный экран в App.jsx
      } else {
        setActiveMainTab(id);
        setActiveTab(id);
      }
    } else {
      // Логика SUB панели
      if (id === 'academy') {
        setIsSubNavigation(false);
        setActiveMainTab('preview');
        setActiveSubTab(null);
        setActiveTab('preview'); // Возвращаемся на превью
      } else {
        setActiveSubTab(id);
        setActiveTab(id);
      }
    }
  };

  const handleProfileClick = () => {
    triggerHaptic();
    setActiveTab('profile');
    setActiveMainTab('profile');
    // Не сбрасываем isSubNavigation, чтобы при возврате из профиля остаться на нужном уровне
  };

  const currentItems = isSubNavigation ? subItems : rootItems;
  // Определяем, какой ID сейчас активен для подсветки
  const currentActiveId = activeTab === 'profile' 
    ? null 
    : (isSubNavigation ? activeSubTab : activeMainTab);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
      <div className="bg-[#0a0a0c]/80 backdrop-blur-xl border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-full p-2 flex items-center justify-between">
        
        {/* Контейнер кнопок (динамический) */}
        <div className="flex items-center justify-around flex-1 relative mr-2">
          {currentItems.map((item) => {
            const isActive = currentActiveId === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex flex-col items-center justify-center w-[4.5rem] h-14 rounded-full transition-all duration-300 relative ${
                  isActive ? 'scale-100' : 'scale-95'
                }`}
              >
                {/* Активная капсула (Фон) */}
                <div 
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#0abab5]/10 opacity-100' : 'opacity-0'
                  }`} 
                />

                {/* Иконка и текст */}
                <div className={`relative z-10 flex flex-col items-center gap-1 transition-colors duration-300 ${
                  isActive ? 'text-[#0abab5]' : 'text-zinc-500 hover:text-zinc-400'
                }`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Разделитель */}
        <div className="w-[1px] h-8 bg-white/5 mx-1" />

        {/* Avatar Button (Всегда справа) */}
        <button
          onClick={handleProfileClick}
          className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
            activeTab === 'profile' 
              ? 'border-[#0abab5] bg-[#0abab5]/10 shadow-[0_0_15px_rgba(10,186,181,0.2)]' 
              : 'border-white/5 bg-[#111112] hover:bg-[#161618]'
          }`}
        >
          {/* Если есть картинка профиля, вставь <img> сюда. Пока стоит иконка. */}
          <User 
            size={20} 
            className={activeTab === 'profile' ? 'text-[#0abab5]' : 'text-zinc-400'} 
          />
        </button>

      </div>
    </div>
  );
};

export default Navigation;