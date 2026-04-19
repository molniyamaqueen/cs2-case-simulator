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

    // Аватарка (круг справа)
    if (isAvatar) {
      return (
        <button
          onClick={() => { setActiveTab(id); triggerHaptic(); }}
          className={`w-11 h-11 rounded-full overflow-hidden shrink-0 ml-1 border-2 transition-colors duration-300 ${
            isActive ? 'border-[#d946ef]' : 'border-transparent'
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

    // Обычные кнопки (как на скрине)
    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        className={`relative flex flex-col items-center justify-center h-[52px] min-w-[72px] px-3 rounded-full transition-all duration-300 ${
          isActive ? 'bg-black shadow-[inset_0_1px_3px_rgba(255,255,255,0.05)]' : 'bg-transparent'
        }`}
        style={{ color: isActive ? activeColor : '#8e8e93' }}
      >
        <div className="mb-0.5">
          {React.cloneElement(icon, { size: 22, strokeWidth: isActive ? 2.5 : 2 })}
        </div>
        
        <span className="text-[11px] font-medium tracking-wide">
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden font-sans">
      
      {/* РАБОЧАЯ ЗОНА */}
      <main className="flex-1 flex items-center justify-center">
         <p className="text-[#2c2c2e] font-bold text-xs tracking-widest uppercase">{activeTab} SCREEN</p>
      </main>

      {/* НАВИГАЦИЯ (Строго по скрину) */}
      <div className="fixed bottom-6 w-full flex justify-center z-50 px-4">
        <nav className="w-full max-w-[380px] bg-[#1c1c1e] rounded-full p-1.5 flex justify-between items-center shadow-2xl">
          
          <NavItem id="market" label="Market" icon={<Store />} activeColor="#ffffff" />
          <NavItem id="games" label="Games" icon={<Gamepad2 />} activeColor="#d946ef" />
          <NavItem id="gifts" label="My gifts" icon={<Gift />} activeColor="#ffffff" />
          <NavItem id="profile" isAvatar={true} />

        </nav>
      </div>

    </div>
  );
};

export default App;
