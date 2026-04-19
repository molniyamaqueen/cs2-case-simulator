import React, { useState, useEffect } from 'react';
import { Store, Gamepad2, Gift } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('market');

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

    if (isAvatar) {
      return (
        <button
          onClick={() => { setActiveTab(id); triggerHaptic(); }}
          className={`w-[44px] h-[44px] rounded-full overflow-hidden shrink-0 transition-all duration-300 ${
            isActive ? 'ring-2 ring-white/20 scale-105' : 'ring-0 opacity-80 hover:opacity-100'
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

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        // Делаем плашку аккуратнее: w-[72px] h-[52px], идеальный радиус rounded-[22px]
        className={`relative flex flex-col items-center justify-center w-[72px] h-[52px] rounded-[22px] transition-all duration-300 ${
          isActive 
            ? 'bg-[#000000]' // Идеально чистый черный, без грязных теней
            : 'bg-transparent'
        }`}
        // Светло-серый цвет для неактивных, чтобы они читались
        style={{ color: isActive ? activeColor : '#98989f' }} 
      >
        <div className={`mb-0.5 transition-transform duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
          {React.cloneElement(icon, { size: 24, strokeWidth: isActive ? 2.5 : 2 })}
        </div>
        
        <span className={`text-[11px] tracking-[0.01em] transition-all duration-300 ${
          isActive ? 'font-bold' : 'font-medium'
        }`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#000000] text-white overflow-hidden font-sans">
      
      <main className="flex-1 flex items-center justify-center">
         <p className="text-[#18181a] font-black text-2xl tracking-widest uppercase">{activeTab}</p>
      </main>

      <div className="fixed bottom-6 w-full flex justify-center z-50 px-4">
        {/* Убрал лишнюю ширину, сделал отступы внутри (p-2) чуть больше, чтобы дышало */}
        <nav className="w-full max-w-[370px] bg-[#18181a] rounded-[36px] p-2 flex justify-between items-center border border-white/[0.03] shadow-2xl">
          
          <NavItem id="market" label="Market" icon={<Store />} activeColor="#ffffff" />
          <NavItem id="games" label="Games" icon={<Gamepad2 />} activeColor="#c061ff" />
          <NavItem id="gifts" label="My gifts" icon={<Gift />} activeColor="#ffffff" />
          <NavItem id="profile" isAvatar={true} />

        </nav>
      </div>

    </div>
  );
};

export default App;
