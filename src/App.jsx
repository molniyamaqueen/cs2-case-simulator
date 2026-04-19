import React, { useState, useEffect } from 'react';
import { Gamepad2, Sparkles, Flame } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('hub');

  const triggerHaptic = (style = 'light') => {
    try {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
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

  const NavItem = ({ id, label, icon, activeColor, activeShadow, isAvatar }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic('light'); }}
        className={`relative flex flex-col items-center justify-center w-[74px] h-[54px] rounded-[20px] transition-all duration-300 ${
          isActive && !isAvatar 
            ? 'bg-[#222226] border border-white/[0.04] shadow-[0_4px_12px_rgba(0,0,0,0.4)]' 
            : 'bg-transparent hover:bg-white/[0.02]'
        }`}
      >
        {isAvatar ? (
          <div className={`w-8 h-8 rounded-full overflow-hidden border transition-all duration-300 ${
            isActive ? 'border-white/40 ring-2 ring-white/10 scale-105' : 'border-transparent opacity-60'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
        ) : (
          <>
            <div 
              className="transition-all duration-300"
              style={{
                color: isActive ? activeColor : '#6b6b70',
                filter: isActive ? `drop-shadow(0 0 10px ${activeShadow})` : 'none',
                transform: isActive ? 'translateY(-1px) scale(1.05)' : 'scale(1)'
              }}
            >
              {/* Клонируем иконку, чтобы задать ей толщину линий */}
              {React.cloneElement(icon, { size: 24, strokeWidth: 2.5 })}
            </div>
            
            <span className={`text-[11px] font-bold mt-1 tracking-wide transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-[#6b6b70]'
            }`}>
              {label}
            </span>
          </>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden font-sans">
      
      {/* ПУСТАЯ РАБОЧАЯ ЗОНА */}
      <main className="flex-1 overflow-y-auto pb-32 pt-8 px-5 animate-in fade-in duration-500">
        <div className="flex flex-col h-full items-center justify-center text-center">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-[#222226]">{activeTab}</h2>
        </div>
      </main>

      {/* ПРЕМИАЛЬНАЯ НАВИГАЦИЯ */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[380px] h-[72px] 
        bg-[#111112] 
        border border-white/[0.04] 
        rounded-[28px] 
        px-2 
        flex items-center justify-between 
        shadow-[0_25px_50px_rgba(0,0,0,0.9)] z-50">
          
        <NavItem 
          id="games" 
          label="Games" 
          icon={<Gamepad2 />} 
          activeColor="#d946ef" // Фиолетовый неон
          activeShadow="rgba(217,70,239,0.4)"
        />
        
        <NavItem 
          id="hub" 
          label="Hub" 
          icon={<Sparkles />} 
          activeColor="#06b6d4" // Кибер-синий неон (AI)
          activeShadow="rgba(6,182,212,0.4)"
        />
        
        <NavItem 
          id="intel" 
          label="Intel" 
          icon={<Flame />} 
          activeColor="#f97316" // Огненно-оранжевый (Новости/Тренды)
          activeShadow="rgba(249,115,22,0.4)"
        />
        
        <NavItem 
          id="profile" 
          isAvatar={true} 
        />

      </nav>

    </div>
  );
};

export default App;
