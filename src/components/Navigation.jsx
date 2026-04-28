import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Gift, 
  Trophy, 
  GraduationCap, 
  Newspaper, 
  BookOpen, 
  Star
} from 'lucide-react';

const triggerHaptic = () => {
  try {
    if (window?.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.selectionChanged();
    } else if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  } catch (error) {}
};

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isSubNavigation, setIsSubNavigation] = useState(false);
  // Ставим дефолтную картинку с горами (как на твоем скрине) на случай, если ТГ не отдаст фотку
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=150&q=80");

  useEffect(() => {
    try {
      const tgUrl = window?.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url;
      if (tgUrl) setAvatarUrl(tgUrl);
    } catch (error) {}
  }, []);

  // Синхронизация при внешних переключениях
  useEffect(() => {
    if (activeTab === 'preview' && isSubNavigation) {
      setIsSubNavigation(false);
    }
  }, [activeTab, isSubNavigation]);

  // --- ЛОГИКА И ЦВЕТА ---
  const leftItem = isSubNavigation 
    ? { id: 'academy', label: 'Academy', icon: GraduationCap, color: 'text-[#ff4b4b]' }
    : { id: 'preview', label: 'Preview', icon: LayoutDashboard, color: 'text-[#00e5c0]' };

  const centerItems = isSubNavigation
    ? [
        { id: 'news', label: 'News', icon: Newspaper, color: 'text-[#00e5c0]' },
        { id: 'guide', label: 'Guide', icon: BookOpen, color: 'text-[#b25cff]' },
        { id: 'season', label: 'Season', icon: Star, color: 'text-[#ffd700]' },
      ]
    : [
        { id: 'arena', label: 'Arena', icon: Gamepad2, color: 'text-[#b25cff]' },
        { id: 'booty', label: 'Booty', icon: Gift, color: 'text-[#0088ff]' },
        { id: 'rating', label: 'Rating', icon: Trophy, color: 'text-[#ffd700]' },
      ];

  const handleLeftClick = () => {
    triggerHaptic();
    if (!isSubNavigation) {
      setIsSubNavigation(true);
      setActiveTab('academy');
    } else {
      setIsSubNavigation(false);
      setActiveTab('preview');
    }
  };

  const handleCenterClick = (id) => {
    triggerHaptic();
    setActiveTab(id);
  };

  const handleProfileClick = () => {
    triggerHaptic();
    setActiveTab('profile');
  };

  const isLeftActive = activeTab === leftItem.id;

  return (
    <div className="fixed bottom-6 left-0 w-full px-4 flex items-center justify-between gap-2 z-50">
      
      {/* 1. ЛЕВАЯ КНОПКА (Переключатель) */}
      <button
        onClick={handleLeftClick}
        className="w-[68px] h-[68px] shrink-0 bg-[#111112] border border-white/5 rounded-full flex flex-col items-center justify-center gap-1 shadow-2xl transition-all duration-300 active:scale-95 relative overflow-hidden"
      >
        {/* Эффект стеклянной линзы для левой кнопки */}
        {isLeftActive && (
          <div className="absolute inset-0 rounded-full -z-10 bg-gradient-to-b from-white/[0.08] to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/5" />
        )}
        
        <leftItem.icon 
          size={22} 
          className={isLeftActive ? leftItem.color : 'text-[#666666]'} 
          style={isLeftActive ? { filter: 'drop-shadow(0 0 6px currentColor)' } : {}}
        />
        <span className={`text-[10px] font-medium tracking-wide ${isLeftActive ? leftItem.color : 'text-[#666666]'}`}>
          {leftItem.label}
        </span>
      </button>

      {/* 2. ЦЕНТРАЛЬНАЯ КАПСУЛА (3 элемента) */}
      <div className="flex-1 h-[68px] bg-[#111112] border border-white/5 rounded-full p-1.5 flex items-center shadow-2xl">
        {centerItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => handleCenterClick(item.id)}
              className="flex-1 h-full flex flex-col items-center justify-center rounded-full relative z-10 transition-all duration-300 active:scale-95"
            >
              {/* Эффект стеклянной линзы для центральных кнопок */}
              {isActive && (
                <div className="absolute inset-0 rounded-full -z-10 bg-gradient-to-b from-white/[0.08] to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-2px_4px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/5" />
              )}
              
              <Icon 
                size={22} 
                className={isActive ? item.color : 'text-[#666666]'} 
                style={isActive ? { filter: 'drop-shadow(0 0 6px currentColor)' } : {}}
              />
              <span className={`text-[10px] font-medium tracking-wide mt-1 ${isActive ? item.color : 'text-[#666666]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. ПРАВАЯ КНОПКА (Аватар профиля) */}
      <button
        onClick={handleProfileClick}
        className={`w-[68px] h-[68px] shrink-0 bg-[#111112] border border-white/5 rounded-full p-1.5 shadow-2xl transition-all duration-300 active:scale-95 ${
          activeTab === 'profile' ? 'ring-2 ring-[#0088ff] ring-offset-2 ring-offset-[#0a0a0c]' : ''
        }`}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#1c1c1e] relative">
          <img 
            src={avatarUrl} 
            alt="Avatar" 
            className={`w-full h-full object-cover transition-all duration-300 ${activeTab === 'profile' ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
          />
        </div>
      </button>

    </div>
  );
};

export default Navigation;