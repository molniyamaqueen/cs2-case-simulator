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

  const NavItem = ({ id, label, icon, isAvatar }) => {
    const isActive = activeTab === id;

    return (
      <button
        onClick={() => { setActiveTab(id); triggerHaptic(); }}
        // Размеры и скругления СТРОГО как в дорогом интерфейсе
        className={`relative flex flex-col items-center justify-center w-[76px] h-[58px] rounded-[24px] transition-all duration-200 ${
          isActive && !isAvatar ? 'bg-[#2c2c2e]' : 'bg-transparent'
        }`}
      >
        {isAvatar ? (
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
        ) : (
          <>
            <div className={`mb-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-[#8e8e93]'}`}>
              {/* Делаем линии иконки чуть плотнее */}
              {React.cloneElement(icon, { size: 24, strokeWidth: isActive ? 2.5 : 2 })}
            </div>
            
            <span className={`text-[10px] font-medium tracking-wide transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-[#8e8e93]'
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
      
      {/* Рабочая зона */}
      <main className="flex-1 flex items-center justify-center">
         <p className="text-[#2c2c2e] font-bold text-xs tracking-widest uppercase">{activeTab} SCREEN IS EMPTY</p>
      </main>

      {/* Навигация 1 в 1 как в Portals */}
      <div className="fixed bottom-6 w-full flex justify-center z-50">
        <nav className="w-[92%] max-w-[380px] bg-[#1c1c1e] rounded-[32px] p-1.5 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          
          <NavItem id="market" label="Market" icon={<Store />} />
          <NavItem id="games" label="Games" icon={<Gamepad2 />} />
          <NavItem id="gifts" label="My gifts" icon={<Gift />} />
          <NavItem id="profile" isAvatar={true} />

        </nav>
      </div>

    </div>
  );
};

export default App;
