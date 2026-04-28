import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Gift, 
  Trophy, 
  GraduationCap, 
  Newspaper, 
  BookOpen, 
  Star,
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
    // Безопасный фоллбэк
  }
};

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isSubNavigation, setIsSubNavigation] = useState(false);

  // Синхронизация, чтобы при возврате не ломался стейт
  useEffect(() => {
    if (activeTab === 'preview' && isSubNavigation) {
      setIsSubNavigation(false);
    }
  }, [activeTab, isSubNavigation]);

  // Логика левой кнопки (Переключатель уровней)
  const leftItem = isSubNavigation 
    ? { id: 'academy', label: 'Academy', icon: GraduationCap }
    : { id: 'preview', label: 'Preview', icon: LayoutDashboard };

  // Логика центрального блока (3 кнопки)
  const centerItems = isSubNavigation
    ? [
        { id: 'news', label: 'News', icon: Newspaper },
        { id: 'guide', label: 'Guide', icon: BookOpen },
        { id: 'season', label: 'Season', icon: Star },
      ]
    : [
        { id: 'arena', label: 'Arena', icon: Gamepad2 },
        { id: 'booty', label: 'Booty', icon: Gift },
        { id: 'rating', label: 'Rating', icon: Trophy },
      ];

  const handleLeftClick = () => {
    triggerHaptic();
    if (!isSubNavigation) {
      // Переходим в SUB
      setIsSubNavigation(true);
      setActiveTab('academy');
    } else {
      // Возвращаемся в ROOT
      setIsSubNavigation(false);
      setActiveTab('preview');
    }
  };

  const handleCenterItemClick = (id) => {
    triggerHaptic();
    setActiveTab(id);
  };

  const handleProfileClick = () => {
    triggerHaptic();
    setActiveTab('profile');
  };

  return (
    <div className="fixed bottom-6 left-0 w-full px-4 flex items-center justify-center gap-2 z-50">
      
      {/* 1. ЛЕВАЯ КНОПКА (Отдельная) */}
      <button
        onClick={handleLeftClick}
        className={`w-16 h-16 rounded-full flex-shrink-0 bg-[#161618] border border-white/5 flex flex-col items-center justify-center gap-1 transition-all duration-300 shadow-lg active:scale-95 ${
          activeTab === leftItem.id ? 'text-[#0abab5]' : 'text-zinc-500 hover:text-zinc-400'
        }`}
      >
        <leftItem.icon size={22} strokeWidth={activeTab === leftItem.id ? 2.5 : 2} />
        <span className="text-[10px] font-bold tracking-wide">
          {leftItem.label}
        </span>
      </button>

      {/* 2. ЦЕНТРАЛЬНАЯ ПАНЕЛЬ (Капсула на 3 элемента) */}
      <div className="flex-1 max-w-[280px] h-16 bg-[#161618] border border-white/5 rounded-full px-1.5 flex items-center shadow-lg relative overflow-hidden transition-all duration-300">
        <div className="flex w-full items-center justify-between">
          {centerItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleCenterItemClick(item.id)}
                className="relative flex-1 h-[52px] flex flex-col items-center justify-center rounded-full transition-all duration-300 z-10 active:scale-95"
              >
                {/* Фон активного элемента (внутренняя капсула) */}
                <div 
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#232328] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]' : 'opacity-0'
                  }`}
                />
                
                <div className={`relative z-20 flex flex-col items-center gap-1 transition-colors duration-300 ${
                  isActive ? 'text-[#0abab5]' : 'text-zinc-500 hover:text-zinc-400'
                }`}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-wide">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ПРАВАЯ КНОПКА (Аватар с толстой обводкой) */}
      <button
        onClick={handleProfileClick}
        className={`w-16 h-16 rounded-full flex-shrink-0 bg-[#161618] border border-white/5 p-1.5 transition-all duration-300 shadow-lg active:scale-95 ${
          activeTab === 'profile' ? 'ring-2 ring-[#0abab5] ring-offset-2 ring-offset-[#0a0a0c]' : ''
        }`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#232328] flex items-center justify-center relative">
          {/* Если есть фото профиля, меняем User на img */}
          <User size={24} className={activeTab === 'profile' ? 'text-[#0abab5]' : 'text-zinc-400'} />
        </div>
      </button>

    </div>
  );
};

export default Navigation;