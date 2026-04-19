import React from 'react';
import { Gamepad2, Sparkles, Flame } from 'lucide-react';
// 1. Импортируем хук языка
import { useLanguage } from '../i18n/LanguageContext';

const Navigation = ({ activeTab, setActiveTab }) => {
  // 2. Достаем функцию перевода t
  const { t } = useLanguage();

  const triggerHaptic = () => {
    try { window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium'); } catch (e) {}
  };

  const NavItem = ({ id, label, icon, activeColor }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className={`relative flex flex-col items-center justify-center w-[76px] h-[56px] rounded-[24px] transition-all duration-500 ${isActive ? 'bg-[#1a1a1c]' : ''}`}
      >
        <div style={{ color: isActive ? activeColor : '#4c4c50' }}>
            {React.cloneElement(icon, { size: 22, strokeWidth: 2.5 })}
        </div>
        <span className={`text-[9px] font-black mt-1 uppercase ${isActive ? 'text-white' : 'text-[#4c4c50]'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#0d0d0f]/95 backdrop-blur-2xl border border-white/5 rounded-[32px] p-2 flex justify-between items-center z-50 shadow-2xl">
      {/* 3. Используем t() для перевода названий вкладок */}
      <NavItem id="games" label={t('nav_games')} icon={<Gamepad2 />} activeColor="#d946ef" />
      <NavItem id="hub" label={t('nav_hub')} icon={<Sparkles />} activeColor="#06b6d4" />
      <NavItem id="intel" label={t('nav_intel')} icon={<Flame />} activeColor="#f97316" />
      
      {/* Кнопка Профиля (Аватарка) */}
      <button onClick={() => { setActiveTab('profile'); triggerHaptic(); }} className={`w-[76px] h-[56px] flex items-center justify-center rounded-[24px] ${activeTab === 'profile' ? 'bg-[#1a1a1c]' : ''}`}>
         <div className={`w-9 h-9 rounded-full overflow-hidden border-2 ${activeTab === 'profile' ? 'border-white' : 'border-transparent opacity-40'}`}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="av" className="w-full h-full object-cover" />
         </div>
      </button>
    </nav>
  );
};

export default Navigation;
