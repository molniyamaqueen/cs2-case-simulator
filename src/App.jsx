import React, { useState } from 'react';
import { Store, Gamepad2, Gift } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('games');

  const triggerHaptic = () => {
    try {
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      }
    } catch (e) {}
  };

  const NavItem = ({ id, icon, label, isAvatar }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className="relative flex flex-col items-center justify-center w-[76px] h-[52px] transition-all duration-300"
      >
        {/* ЭФФЕКТ ВЖАТОЙ КАПСУЛЫ (ЛУНКА) */}
        {isActive && !isAvatar && (
          <div className="absolute inset-0 rounded-full 
            bg-[#0d0d0f] 
            shadow-[inset_6px_6px_12px_rgba(0,0,0,0.8),inset_-2px_-2px_6px_rgba(255,255,255,0.03)] 
            border-[0.5px] border-white/5" 
          />
        )}

        <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${isActive ? 'scale-90 translate-y-[1px]' : 'text-[#4c4c50]'}`}>
          {isAvatar ? (
             <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${isActive ? 'border-white/20' : 'border-transparent opacity-60'}`}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="P" className="w-full h-full object-cover" />
             </div>
          ) : (
            <>
              <div className={`transition-colors duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : ''}`}>
                {icon}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-tight mt-1 transition-all ${isActive ? 'text-white opacity-100' : 'opacity-60'}`}>
                {label}
              </span>
            </>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      
      {/* ПУСТАЯ РАБОЧАЯ ЗОНА */}
      <main className="flex-1 overflow-y-auto pb-28 px-4 pt-6">
        <div className="flex h-full items-center justify-center text-[#2a2a2d] font-black uppercase tracking-[0.3em] text-[10px]">
          {activeTab} module active
        </div>
      </main>

      {/* ГЛАВНАЯ ПАНЕЛЬ (КОРПУС) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm 
        bg-[#18181b] 
        rounded-[32px] 
        px-3 py-2 
        z-50 
        border border-white/[0.03]
        shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)]">
        
        <div className="flex justify-between items-center">
          <NavItem id="market" icon={<Store size={20} />} label="Market" />
          <NavItem id="games" icon={<Gamepad2 size={20} className={activeTab === 'games' ? 'text-[#e879f9]' : ''} />} label="Games" />
          <NavItem id="gifts" icon={<Gift size={20} />} label="My gifts" />
          <NavItem id="profile" isAvatar={true} label="Profile" />
        </div>
      </nav>

    </div>
  );
};

export default App;
