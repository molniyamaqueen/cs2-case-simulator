import React, { useState } from 'react';
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

  // Компонент отдельной кнопки навигации (Идеальный вжатый овал)
  const NavItem = ({ id, icon, label, isAvatar }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className={`relative flex flex-col items-center justify-center w-[76px] h-[54px] rounded-full transition-all duration-300 ${
          isActive ? 'text-white' : 'text-[#6b6b70] hover:text-gray-400'
        }`}
      >
        {/* Эффект вжатой лунки (Капля) */}
        {isActive && !isAvatar && (
          <div className="absolute inset-0 bg-[#0a0a0c]/80 shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)] border-t border-b border-white/[0.02] rounded-full -z-10" />
        )}

        {isAvatar ? (
          <div className={`w-8 h-8 rounded-full overflow-hidden transition-all duration-300 ${
            isActive ? 'ring-2 ring-white/10 scale-105' : 'opacity-70'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <>
            <div className={`transition-transform duration-300 ${isActive ? 'translate-y-[1px]' : ''} mb-1`}>
              {icon}
            </div>
            <span className={`text-[10px] font-medium leading-none tracking-wide transition-transform duration-300 ${isActive ? 'translate-y-[1px]' : ''}`}>
              {label}
            </span>
          </>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden">
      
      {/* ПУСТАЯ РАБОЧАЯ ЗОНА */}
      <main className="flex-1 overflow-y-auto pb-28 px-4 pt-6">
        <div className="flex h-full items-center justify-center text-[#3a3a3c] font-bold uppercase tracking-widest text-xs">
          {activeTab} SCREEN IS EMPTY
        </div>
      </main>

      {/* НОВАЯ НАВИГАЦИЯ */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm bg-[#151516] border border-white/5 rounded-[28px] px-2 py-2 z-50">
        <div className="flex justify-between items-center">
          <NavItem id="market" icon={<Store size={22} />} label="Market" />
          <NavItem id="games" icon={<Gamepad2 size={22} className={activeTab === 'games' ? 'text-[#d946ef]' : ''} />} label="Games" />
          <NavItem id="gifts" icon={<Gift size={22} />} label="My gifts" />
          <NavItem id="profile" isAvatar={true} label="Profile" />
        </div>
      </nav>

    </div>
  );
};

export default App;
