import React, { useState, useEffect } from 'react';
import { Store, Gamepad2, Gift } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('games');

  const triggerHaptic = () => {
    try {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      }
    } catch (e) {}
  };

  useEffect(() => {
    try {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        if (window.Telegram.WebApp.setHeaderColor) {
            window.Telegram.WebApp.setHeaderColor('#000000');
        }
      }
    } catch (e) {}
  }, []);

  const NavItem = ({ id, label, icon, activeColor, isAvatar }) => {
    const isActive = activeTab === id;

    // Аватарка (крупнее и ближе к краю, как на скрине)
    if (isAvatar) {
      return (
        <button
          onClick={() => { setActiveTab(id); triggerHaptic(); }}
          className={`w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 ml-1 transition-all duration-300 ${
            isActive ? 'ring-2 ring-white/20' : 'ring-0 opacity-90'
          }`}
        >
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </button>
      );
    }

    // Идеально выверенные кнопки 1 в 1
    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        // Широкая таблетка (w-[82px] h-[54px]) с эффектом вжатости
        className={`relative flex flex-col items-center justify-center h-[54px] w-[82px] rounded-[26px] transition-all duration-300 ${
          isActive 
            ? 'bg-[#000000] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] border border-white/[0.02]' 
            : 'bg-transparent'
        }`}
        style={{ color: isActive ? activeColor : '#6e6e73' }} // #6e6e73 - цвет неактивного текста как на референсе
      >
        <div className={`mb-0.5 transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
          {/* Делаем иконку чуть плотнее */}
          {React.cloneElement(icon, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
        </div>
        
        <span className="text-[10px] font-semibold tracking-[0.02em]">
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden font-sans">
      
      {/* РАБОЧАЯ ЗОНА */}
      <main className="flex-1 flex items-center justify-center">
         <p className="text-[#18181a] font-black text-2xl tracking-widest uppercase">{activeTab}</p>
      </main>

      {/* НАВИГАЦИЯ (Идеальный клон) */}
      <div className="fixed bottom-6 w-full flex justify-center z-50 px-4">
        <nav className="w-full max-w-[390px] bg-[#18181a] rounded-[34px] p-1.5 flex justify-between items-center border border-white/[0.04] shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
          
          <NavItem id="market" label="Market" icon={<Store />} activeColor="#ffffff" />
          <NavItem id="games" label="Games" icon={<Gamepad2 />} activeColor="#c061ff" /> {/* Оригинальный фиолетовый из Portals */}
          <NavItem id="gifts" label="My gifts" icon={<Gift />} activeColor="#ffffff" />
          <NavItem id="profile" isAvatar={true} />

        </nav>
      </div>

    </div>
  );
};

export default App;
